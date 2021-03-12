import React, { useRef, useState, useEffect, memo } from "react";
import { Card, Col, Row, Space, Spin } from "antd";
import styles from "./style.module.scss";
import { BulbOutlined, RightOutlined } from "@ant-design/icons";
import TimeSelect from "../components/TimeSelect";
import * as echarts from "echarts";
import LineChartOptions from "./lineChart";
import BloodOxyBar from "../components/BloodOxyBar";

// 血氧
export default function BloodOxy() {
	let chartsRef = useRef(null);

	useEffect(() => {
		let myChart = echarts.init(chartsRef.current!);
		myChart.setOption(LineChartOptions);
	}, [])

	return (
		<main className={styles.main}>
			<Spin spinning={false}>
				<div className={styles.page_wrap}>
					<Card
						className={styles.history_list}
						size={"small"}
						title={<div className={styles.card_header}>历史记录</div>}>
						<TimeSelect
							className='w-2/2'
							options={Array.from({ length: 10 }, (_, i) => {
								return { label: i, value: i }
							})}
						/>
					</Card>
					<Card
                        className={styles.test_time}
                        size={"small"}
                        title={<div className={styles.card_header}>检测时间：2021年03月03日 星期三</div>}>
						<BloodOxyBar title="血氧饱和度" value="Sp02(%)"/>
						<BloodOxyBar title="脉率" value="PR(bpm)"/>						
					</Card>
					<Card
						className={styles.test_about}
						size={"small"}>
						<BulbOutlined className={styles.icon} />
						关于血氧
            			<br />
						<p>
							血氧饱和度用于测量血红细胞中蛋白质（血红蛋白）内的氧气量。为了维持正常机能，人体血液中需要一定程度的氧循环。血红细胞与肺中的氧气结合（达到饱和），并将它运送到体内各个部位。
            			</p>
						<BulbOutlined className={styles.icon} />
						关于末梢灌注指数
            			<br />
						<p>灌注指数用于测量身体不同部位的相对脉冲强度，如指尖、足尖或耳垂。它还用于提供测量部位大致的血流量估算值。</p>
					</Card>
				</div>
				<Card
					className={styles.blood_sugar_trends}
					size={"small"}
					title={<div className={styles.card_header}>尿检趋势</div>}
				>
					<div className={styles.blood_sugar_trends_content} ref={chartsRef}></div>
				</Card>
			</Spin>
		</main>
	)
}
