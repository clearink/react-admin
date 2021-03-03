import React, { memo } from "react"
import { Badge, Card, Progress, Space, Spin } from "antd"
import classNames from "classnames"
import moment from "moment"
import styles from "./style.module.scss"
import { ExclamationCircleOutlined, UserAddOutlined } from "@ant-design/icons"
import useQuery from "@/hooks/useQuery"
import useMemoFetch from "@/hooks/useMemoFetch"

// 睡眠详情
function SleepDetail() {
	const query = useQuery()
	const [{ data, loading }] = useMemoFetch({
		url: "/orgmgt/health/bed/queryByNum",
		params: { num: query.get("device") },
		cache: true,
		transform: (response, cache) => {
			if (cache) return response
			return response.result
		},
	})
	return (
		<Spin spinning={loading}>
			<div className='flex justify-around flex-wrap'>
				<Card className='w-full mb-8 lg:w-10/24' title='整体情况' size='small'>
					<div className={styles.bed_wrap}>
						<div className={styles.bed_detail}>
							<p className='font-bold'>您昨晚睡得很好</p>
							<p>
								您的上床时间为
								{data &&
									moment(data.onBedTime * 1000).format("YYYY-MM-DD HH:mm:ss")}
								, 起床时间为
								{data &&
									moment(data.outBedTime * 1000).format("YYYY-MM-DD HH:mm:ss")}
							</p>
							<p>
								您的入睡时间为
								{data &&
									moment(data.fallAsleepTime * 1000).format(
										"YYYY-MM-DD HH:mm:ss"
									)}
								, 醒来时间为
								{data &&
									moment(data.wakeUpTime * 1000).format("YYYY-MM-DD HH:mm:ss")}
							</p>
							<p>您的有效睡眠时长为{data?.asleepTime} 分属很好</p>
							<p>您的入睡时长为{data?.asleepTime} 分属很好</p>
							<p>您的有效睡眠时长为{data?.asleepTime} 分属很好</p>
							<p>您的入睡效率为{(data?.sleepRatio ?? 0) * 100}属较差</p>
							<p>在睡眠期间您的离床次数为{data?.sleepOutBedCount}次 属正常</p>
						</div>
						<Progress
							type='circle'
							percent={40}
							format={() => (
								<div className={styles.progress_tip}>
									<span className={styles.label}>睡眠评分</span>
									<span className={styles.value}>{data?.sleepLevel}</span>
								</div>
							)}
							className={styles.sleep_percent}
						/>
					</div>
				</Card>
				<Card
					className={"w-full mb-8 lg:w-10/24"}
					title='睡眠分布'
					size='small'
				>
					<div className={classNames("flex h-full", styles.sleep_time)}>
						<div className='flex items-center justify-center flex-col w-1/3'>
							<p>睡眠时长:</p>
							<span>{data?.asleepTime}</span>
						</div>
						<Space
							direction='vertical'
							className='w-2/3 flex flex-col justify-center'
						>
							<div className='flex w-full justify-around'>
								<Badge text='深睡 | XX%' status='processing' />
								<span>{data?.deepSleep}</span>
							</div>
							<div className='flex w-full justify-around'>
								<Badge text='浅睡 | XX%' status='success' />
								<span>{data?.lightSleep}</span>
							</div>
							<div className='flex w-full justify-around'>
								<Badge text='醒着 | XX%' status='success' />
								<span>{data?.wakeUpSleep}</span>
							</div>
							<div className='flex w-full justify-around'>
								<Badge text='离线 | XX%' status='warning' />
								<span>{data?.offline}</span>
							</div>
						</Space>
					</div>
				</Card>
				<div className={classNames("w-full mb-4 md:w-5/12 lg:w-5/24", styles.leave_bed)}>
					<UserAddOutlined className={styles.icon} />
					<div className='flex flex-col'>
						<span className={styles.number}>{data?.sleepOutBedCount ?? 0}</span>
						<span>夜间离床</span>
					</div>
				</div>
				<div className={classNames("w-full mb-4 md:w-5/12 lg:w-5/24", styles.avg_alarm)}>
					<ExclamationCircleOutlined className={styles.icon} />
					<div className='flex flex-col'>
						<span className={styles.number}>{0}</span>
						<span>告警次数</span>
					</div>
				</div>
				<div className={classNames("w-full mb-4 md:w-5/12 lg:w-5/24", styles.avg_bmp)}>
					<UserAddOutlined className={styles.icon} />
					<div className='flex flex-col'>
						<span className={styles.number}>{data?.avgHeart ?? 0}</span>
						<span>平均心率(bmp)</span>
					</div>
				</div>
				<div className={classNames("w-full mb-4 md:w-5/12 lg:w-5/24", styles.avg_rpm)}>
					<UserAddOutlined className={styles.icon} />
					<div className='flex flex-col'>
						<span className={styles.number}>{data?.avgBreath ?? 0}</span>
						<span>平均呼吸(rpm)</span>
					</div>
				</div>
			</div>
		</Spin>
	)
}

export default memo(SleepDetail)
