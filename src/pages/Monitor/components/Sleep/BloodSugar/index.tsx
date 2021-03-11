import React, { memo, useState, useEffect, useRef } from "react"
import { BulbOutlined, RightOutlined } from "@ant-design/icons"
import { Card, Spin } from "antd"
import styles from "./style.module.scss"
import BloodSugarApi from "@/http/ly/pages/BloodSugarApi"
import { useParams } from "react-router-dom"
import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import * as echarts from "echarts"
import TimeSelect from "../components/TimeSelect"

function BloodSugar() {
	const { id } = useParams<{ id: string }>()
	console.log(id)
	const [historyListSelected, setHistoryListSelected] = useState(0)
	const [indexList, setIndexList] = useState([])
	const [historyList, setHistoryList] = useState([])
	const [today, setToday] = useState([])

	const getBloodSugarIndexList = useMemoCallback(() => {
		// 首页数据
		BloodSugarApi.getIndex({ memberId: id }).then(({ data }) => {
			setIndexList(data.result.latestData)
		})
		// 历史记录
		BloodSugarApi.getRecordList({ memberId: id }).then(({ data }) => {
			setHistoryList(data.result.records)
		})
		// 今日检测数据
		BloodSugarApi.getToday({ memberId: id, today: new Date() }).then(
			({ data }) => {
				setToday(data.result)
			}
		)
	}, [])

	useEffect(() => {
		let element = document.getElementById("main")
		let myChart = echarts.init(element as HTMLDivElement)
		let option = {
			title: {},
			tooltip: {},
			legend: {
				data: ["销量", "利润", "比率"],
			},
			xAxis: {
				data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
			},
			yAxis: {},
			series: [
				{
					data: [150, 230, 224, 218, 135, 147, 260],
					type: "line",
				},
			],
		}
		myChart.setOption(option)
	}, [])

	console.log(indexList, "--", historyList, "--", today)
	useEffect(() => {
		getBloodSugarIndexList()
		// getEcharts();
	}, [getBloodSugarIndexList])
	return (
		<main className={styles.main}>
			<Spin spinning={false}>
				<div className={styles.page_wrap}>
					<Card
						className={styles.history_list}
						size={"small"}
						title={<div className={styles.card_header}>历史记录</div>}
					>
						<TimeSelect />
					</Card>
					<Card
						className={styles.test_time}
						size={"small"}
						title={
							<div className={styles.card_header}>
								检测时间：2021年03月03日 星期三
							</div>
						}
					></Card>
					<Card className={styles.test_about} size={"small"}>
						<div className={styles.about_header}>
							<BulbOutlined className={styles.icon} />
							关于血糖
						</div>
						<div className={styles.about_content}>
							血糖也叫做葡萄糖，是血液中最主要的糖类，也是身体能量的主要来源。
						</div>
					</Card>
				</div>
				<div className={styles.blood_sugar_trends}>
					<Card
						className={styles.test_time}
						size={"small"}
						title={<div className={styles.card_header}>血糖趋势</div>}
					>
						<div className={styles.test_time_content} id='main'>
							折线图
						</div>
					</Card>
				</div>
			</Spin>
		</main>
	)
}

export default memo(BloodSugar)
