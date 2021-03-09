import React, { memo, useEffect, useRef } from "react"
import { Badge, Card, Progress, Space, Spin } from "antd"
import classNames from "classnames"
import moment from "moment"
import styles from "./style.module.scss"
import { ExclamationCircleOutlined, UserAddOutlined } from "@ant-design/icons"
import useQuery from "@/hooks/useQuery"
import useMemoFetch from "@/hooks/useMemoFetch"
import * as echarts from "echarts"
import PieChartOptions from "./pieChart"
import WatchCard from "./WatchCard"
import SleepStatus from "./SleepStatus"
import IconFont from "@/components/IconFont"

// 睡眠详情
function SleepDetail() {
	const query = useQuery()
	const [{ data, loading }] = useMemoFetch({
		cache: true,
		url: "/orgmgt/health/bed/queryByNum",
		params: { num: query.get("device") },
		transform: (response, cache) => {
			if (cache) return response
			return response.result
		},
	})
	const chartRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const element = echarts.init(chartRef.current!)
		element.setOption(PieChartOptions as any)
	}, [])
	return (
		<Spin spinning={loading}>
			<div className={styles.page_wrap}>
				<Card
					size='small'
					className={styles.history_list}
					title={<div className={styles.header}>历史记录</div>}
				>
					{Array.from({ length: 10 }, (_, i) => (
						<div className='py-2' key={i}>
							{i}
						</div>
					))}
				</Card>
				<Card
					size='small'
					className={styles.test_time}
					title={<div className={styles.header}>检测时间XXXXXXXX</div>}
				>
					<div
						className={styles.chart_wrap}
						ref={chartRef}
						style={{ width: 200, height: 300 }}
					></div>
					<Space
						direction='vertical'
						size={20}
						className='flex flex-1 flex-col justify-center'
					>
						<SleepStatus
							title='深睡 | XX%'
							score={data?.deepSleep}
							color='#1991ff'
						/>
						<SleepStatus
							title='浅睡 | XX%'
							score={data?.lightSleep}
							color='#16c2c2'
						/>
						<SleepStatus title='REM | XX%' score={data?.rem} color='#30c25b' />
						<SleepStatus
							title='醒着 | XX%'
							score={data?.wakeUpSleep}
							color='#facc15'
						/>
						<SleepStatus
							title='离线 | XX%'
							score={data?.offline}
							color='#f14764'
						/>
					</Space>
				</Card>
				<Card
					size='small'
					className={styles.test_info}
					title={<div className={styles.header}>整体情况</div>}
				>
					<div className={styles.bed_detail}>
						<p className='font-bold'>您昨晚睡得很好</p>
						<p>
							您的上床时间为
							{moment(data?.onBedTime * 1000).format("YYYY-MM-DD HH:mm:ss")},
							起床时间为
							{moment(data?.outBedTime * 1000).format("YYYY-MM-DD HH:mm:ss")}
						</p>
						<p>
							您的入睡时间为
							{moment(data?.fallAsleepTime * 1000).format(
								"YYYY-MM-DD HH:mm:ss"
							)}
							, 醒来时间为
							{moment(data?.wakeUpTime * 1000).format("YYYY-MM-DD HH:mm:ss")}
						</p>
						<div className='flex w-full flex-wrap'>
							<div className='flex-auto'>
								<p>您的有效睡眠时长为{data?.asleepTime} 分属很好</p>
								<p>您的入睡时长为{data?.asleepTime} 分属很好</p>
								<p>您的有效睡眠时长为{data?.asleepTime} 分属很好</p>
								<p>您的入睡效率为{(data?.sleepRatio ?? 0) * 100}属较差</p>
								<p>在睡眠期间您的离床次数为{data?.sleepOutBedCount}次 属正常</p>
							</div>
							<Progress
								type='circle'
								percent={data?.sleepScore ?? 0}
								className={styles.sleep_percent}
								format={() => (
									<div className={styles.progress_tip}>
										<span className={styles.label}>睡眠评分</span>
										<span className={styles.value}>{data?.sleepLevel}</span>
									</div>
								)}
							/>
						</div>
					</div>
				</Card>
				<Card
					className='w-full mb-8'
					size='small'
					title={<div className={styles.header}>夜间指标统计</div>}
				>
					<div className='w-full flex flex-wrap justify-between'>
						<WatchCard
							title='夜间离床'
							color='#722ed1'
							count={data?.sleepOutBedCount}
							icon={<UserAddOutlined className={styles.statistics_icon} />}
						/>
						<WatchCard
							title='告警次数'
							color='#f5222d'
							count={data?.warnCount}
							icon={<UserAddOutlined className={styles.statistics_icon} />}
						/>
						<WatchCard
							title='平均心率(bmp)'
							color='#53c31b'
							count={data?.avgHeart}
							icon={<IconFont type='icon-heart' className={styles.statistics_icon} />}
						/>
						<WatchCard
							title='平均呼吸(rpm)'
							color='#1991ff'
							count={data?.avgBreath}
							icon={<IconFont type='icon-lung' className={styles.statistics_icon} />}
						/>
					</div>
				</Card>
			</div>
		</Spin>
	)
}

export default memo(SleepDetail)
