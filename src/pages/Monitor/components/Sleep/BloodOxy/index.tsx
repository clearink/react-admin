import React, { useRef, useState, useEffect, memo } from "react"
import { Button, Card, Spin } from "antd"
import styles from "./style.module.scss"
import { BulbOutlined } from "@ant-design/icons"
import TimeSelect from "../components/TimeSelect"
import * as echarts from "echarts"
import LineChartOptions from "./lineChart"
import BloodOxyBar from "../components/BloodOxyBar"
import BloodOxyApi from "@/http/api/pages/BloodOxyApi"
import { useParams } from "react-router"
import useTimeList from "./useTimeList"

function createSpO2List(...args: any[]) {
	return [
		{
			title: "最大",
			value: args[0],
			color: "rgba(141, 96, 238, 1)",
		},
		{
			title: "平均",
			value: args[1],
			color: "rgba(218, 145, 242, 1)",
		},
		{
			title: "最小",
			value: args[2],
			color: "rgba(173, 121, 244, 1)",
		},
	]
}
function createPRList(...args: any[]) {
	return [
		{
			title: "最大",
			value: args[0],
			color: "rgba(96, 238, 178, 1)",
		},
		{
			title: "平均",
			value: args[1],
			color: "rgba(57, 225, 209, 1)",
		},
		{
			title: "最小",
			value: args[2],
			color: "rgba(147, 229, 246, 1)",
		},
	]
}

// 血氧
export default function BloodOxy() {
	const { id } = useParams<{ id: string }>()
	const [bloodOxy, setBloodOxy] = useState(() => createSpO2List(0, 0, 0)) // 血氧
	const [rate, setRate] = useState(() => createSpO2List(0, 0, 0)) // 脉率
	const chartRef = useRef<HTMLDivElement>(null)

	// 分页数据请求函数
	const [current, setCurrent] = useState(0)

	const { hasMore, timeList, fetchData } = useTimeList(
		{
			memberId: id,
			pageNo: current + 1,
			pageSize: 10,
		},
		BloodOxyApi.HistoryList
	)
	useEffect(() => {
		if (hasMore) fetchData()
	}, [fetchData, current, hasMore])

	useEffect(() => {
		;(async () => {
			const {
				data: { result },
			} = await BloodOxyApi.HomeData({ memberId: id })
			const { latestData, chartData } = result
			setBloodOxy(
				createSpO2List(
					latestData.maxSpo2,
					latestData.avgSpo2,
					latestData.minSpo2
				)
			)
			setRate(
				createPRList(latestData.maxPr, latestData.avgPr, latestData.minPr)
			)
		})()
	}, [id])

	const handleDetailData = async (_: any, item: any) => {
		const {
			data: { result },
		} = await BloodOxyApi.TodayData({
			memberId: id,
			today: item.time,
		})
		setBloodOxy(createSpO2List(result.maxSpo2, result.avgSpo2, result.minSpo2))
		setRate(createPRList(result.maxPr, result.avgPr, result.minPr))
	}
	const handleLoadMore = () => {
		setCurrent((p) => p + 1)
	}
	return (
		<main className={styles.main}>
			<Spin spinning={false}>
				<div className={styles.page_wrap}>
					<Card
						className={styles.history_list}
						size={"small"}
						title={<div className={styles.card_header}>历史记录</div>}
					>
						<TimeSelect
							className='w-2/2'
							extra={
								<Button
									type='link'
									className='w-full'
									disabled={!hasMore}
									onClick={handleLoadMore}
								>
									加载更多
								</Button>
							}
							onChange={handleDetailData}
							options={timeList.map((item) => {
								return {
									label: item.startTime,
									value: item.id,
									time: item.startTime,
								}
							})}
						/>
					</Card>
					<Card
						className={styles.test_time}
						size={"small"}
						title={
							<div className={styles.card_header}>
								检测时间：2021年03月03日 星期三
							</div>
						}
					>
						<BloodOxyBar
							title='血氧饱和度'
							base={bloodOxy[1].value}
							data={bloodOxy}
							description='SpO2(%)'
							className='mr-10'
						/>
						<BloodOxyBar
							title='脉率'
							base={rate[1].value}
							data={rate}
							description='PR(bpm)'
						/>
					</Card>
					<Card className={styles.test_about} size={"small"}>
						<BulbOutlined className={styles.icon} />
						关于血氧
						<br />
						<p>
							血氧饱和度用于测量血红细胞中蛋白质（血红蛋白）内的氧气量。为了维持正常机能，人体血液中需要一定程度的氧循环。血红细胞与肺中的氧气结合（达到饱和），并将它运送到体内各个部位。
						</p>
						<BulbOutlined className={styles.icon} />
						关于末梢灌注指数
						<br />
						<p>
							灌注指数用于测量身体不同部位的相对脉冲强度，如指尖、足尖或耳垂。它还用于提供测量部位大致的血流量估算值。
						</p>
					</Card>
				</div>
				<Card
					className={styles.blood_sugar_trends}
					size={"small"}
					title={<div className={styles.card_header}>尿检趋势</div>}
				>
					<div
						className={styles.blood_sugar_trends_content}
						ref={chartRef}
					></div>
				</Card>
			</Spin>
		</main>
	)
}
