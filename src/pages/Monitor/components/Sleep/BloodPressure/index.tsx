import React, { useEffect, useRef, useState } from "react"
import { Button, Card } from "antd"
import moment from "moment"
import styles from "./style.module.scss"
import { BulbOutlined } from "@ant-design/icons"
import TimeSelect from "../components/TimeSelect"
import PressureBar from "../components/PressureBar"
import * as echarts from "echarts"
import chartOption, { calcChartData } from "./chart"
import BloodPressureApi from "@/http/api/pages/BloodPressureApi"
import { useParams } from "react-router-dom"
import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import throttle from "@/utils/event/throttle"

// 血压

// 收缩压
const shrinkPressure = [
	{
		value: 0,
		color: "#60baef",
		description: "偏低",
	},
	{
		value: 90,
		color: "#9adb61",
		grow: 2,
		description: "高压正常范围",
	},
	{
		value: 134,
		color: "#ef7663",
		description: "偏高",
	},
]

// 舒张压
const relaxPressure = [
	{
		value: 0,
		color: "#60baef",
		description: "偏低",
	},
	{
		value: 60,
		color: "#9adb61",
		grow: 2,
		description: "低压正常范围",
	},
	{
		value: 84,
		color: "#ef7663",
		description: "偏高",
	},
]

function BloodPressure() {
	const { id } = useParams<{ id: string }>()
	// const {} = useMemoFetch({
	// 	url: "",
	// })
	const [pagination, setPagination] = useState({ current: 0, hasMore: true })
	const fetchData = useMemoCallback(async (update: boolean = false) => {
		// 是否更新值
		const {
			data: { result },
		} = await BloodPressureApi.HistoryList({
			memberId: id,
			pageNo: pagination.current + 1,
			pageSize: 10,
		})
		setTimeList((p) =>
			p.concat(
				result.records?.map((item: any) => ({
					label: item.startTime,
					value: item.startTime,
				})) ?? []
			)
		)
		setPagination({
			current: result.current,
			hasMore: result.current < result.pages,
		})
	})

	const chartRef = useRef<any>(null)
	useEffect(() => {
		let charts: any = null
		const change = throttle(() => charts?.resize(), 40)
		;(async () => {
			const {
				data: { result },
			} = await BloodPressureApi.HomeData({ memberId: id })
			const { latestData, chartData } = result
			setPressure({ shrink: latestData.sp, relax: latestData.dp })
			const element = chartRef.current
			charts = echarts.init(element as HTMLDivElement)
			const chartList = calcChartData(chartData) as [
				number[],
				number[],
				number[]
			]
			charts.setOption(chartOption(...chartList) as any)
			change()
			window.addEventListener("resize", change)
		})()
		return () => {
			charts?.dispose()
			window.removeEventListener("resize", change)
		}
	}, [id])

	const [timeList, setTimeList] = useState<any[]>([])

	// 历史记录数据
	useEffect(() => {
		fetchData()
	}, [id, fetchData])

	// 检测数据
	const [recordList, setRecordList] = useState<any[]>([])

	// 血压数据
	const [pressure, setPressure] = useState({ shrink: 0, relax: 0 })

	const handleLoadMore = () => {
		fetchData()
	}
	// 加载详细数据
	const handleLoadDetail = async (value: any) => {
		const {
			data: { result },
		} = await BloodPressureApi.TodayData({ memberId: id, today: value })
		const newList = result?.map((item: any) => ({
			label: `${moment(item.startTime).format("HH:mm")} ${item.sp} / ${
				item.dp
			} mmHg`,
			value: item.id,
			dp: item.dp,
			sp: item.sp,
		}))
		setRecordList(newList)
	}

	return (
		<div className={styles.blood_oxy_page_wrap}>
			<div className={styles.card_wrap}>
				<Card
					size='small'
					className={styles.history}
					title={<div className={styles.header}>历史记录</div>}
				>
					<div className='flex flex-wrap'>
						<TimeSelect
							className='w-1/2'
							options={timeList}
							onChange={handleLoadDetail}
							extra={
								<Button
									className='w-full text-left pl-0'
									type='link'
									onClick={handleLoadMore}
									disabled={!pagination.hasMore}
								>
									加载更多
								</Button>
							}
						/>
						<TimeSelect
							className='w-1/2'
							options={recordList}
							onChange={(value, item) => {
								setPressure({
									shrink: item.sp,
									relax: item.dp,
								})
							}}
						/>
					</div>
				</Card>
				<Card
					size='small'
					className={styles.test_time}
					title={
						<div className={styles.header}>
							检测时间：2021年03月03日 星期三 上午10:35
						</div>
					}
				>
					<PressureBar
						title='收缩压(高压 mmHg)'
						value={pressure.shrink}
						separator={shrinkPressure}
					/>
					<PressureBar
						className='mt-8'
						title='舒张压(低压 mmHg)'
						value={pressure.relax}
						separator={relaxPressure}
					/>
				</Card>
				<Card size='small' className={styles.about_blood_pressure}>
					<h5 className={styles.about_header}>
						<BulbOutlined className={styles.icon} />
						关于血压
					</h5>
					血压是指心脏输送血液时血流对动脉壁产生的压力。有两种测量方式。“收缩压”是指心脏跳动时输送血液所产生的血压。“舒张压”是指心脏跳动间隔心脏舒张处于静止时所产生的血压。血压值通常会将收缩压数值写在舒张压数字的上面或前面（例如：120/80）。
				</Card>
			</div>
			<div className={styles.chart}>
				<div className={styles.title}>血压趋势</div>
				<div ref={chartRef} style={{ width: "100%", height: 600 }}></div>
			</div>
		</div>
	)
}
export default BloodPressure
