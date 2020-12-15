import React, { memo } from "react"
import { Badge, Card, Progress, Space } from "antd"
import classNames from "classnames"
import styles from "./style.module.scss"
import { UserAddOutlined } from "@ant-design/icons"

// 睡眠详情
function SleepDetail() {
	return (
		<div>
			<div className='flex justify-around flex-wrap'>
				<Card
					className={classNames("w-5/12 mb-8")}
					title='整体情况'
					size='small'
				>
					<Progress
						type='circle'
						percent={40}
						format={() => "睡眠评分"}
						className={styles.sleep_percent}
					/>
				</Card>
				<Card className='w-5/12 mb-8' title='睡眠分布' size='small'>
					<div className={classNames("flex h-full", styles.sleep_time)}>
						<div className='flex items-center justify-center flex-col w-1/3'>
							<p>睡眠时长:</p>
							<span>XX时XX分XX秒</span>
						</div>
						<Space
							direction='vertical'
							className='w-2/3 flex flex-col justify-center'
						>
							<div className='flex w-full justify-around'>
								<Badge text='深睡 | XX%' status='processing' />
								<span>XX时XX分XX秒</span>
							</div>
							<div className='flex w-full justify-around'>
								<Badge text='浅睡 | XX%' status='success' />
								<span>XX时XX分XX秒</span>
							</div>
							<div className='flex w-full justify-around'>
								<Badge text='醒着 | XX%' status='success' />
								<span>XX时XX分XX秒</span>
							</div>
							<div className='flex w-full justify-around'>
								<Badge text='离线 | XX%' status='warning' />
								<span>XX时XX分XX秒</span>
							</div>
						</Space>
					</div>
				</Card>
				<div className={classNames("w-full mb-4 lg:w-3/12", styles.leave_bed)}>
					<UserAddOutlined className={styles.icon} />
					<div className='flex flex-col'>
						<span className={styles.number}>0</span>
						<span>夜间离床</span>
					</div>
				</div>
				<div className={classNames("w-full  mb-4  lg:w-3/12", styles.avg_bmp)}>
					<UserAddOutlined className={styles.icon} />
					<div className='flex flex-col'>
						<span className={styles.number}>0</span>
						<span>平均心率(bmp)</span>
					</div>
				</div>
				<div
					className={classNames("w-full  mb-4  lg:w-3/12", styles.avg_rpm)}
				>
					<UserAddOutlined className={styles.icon} />
					<div className='flex flex-col'>
						<span className={styles.number}>0</span>
						<span>平均呼吸(rpm)</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default memo(SleepDetail)
