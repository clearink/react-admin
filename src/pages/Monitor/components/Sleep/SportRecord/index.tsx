import IconFont from "@/components/IconFont"
import { BulbOutlined } from "@ant-design/icons"
import { Card } from "antd"
import React from "react"
import TimeSelect from "../components/TimeSelect"
import styles from "./style.module.scss"

function SportRecord() {
	return (
		<div className={styles.sport_record_page_wrap}>
			<div className={styles.record_wrap}>
				<Card
					size='small'
					className={styles.history}
					title={<div className={styles.header}>历史记录</div>}
				>
					<TimeSelect />
				</Card>
				<Card
					size='small'
					className={styles.test_time}
					title={<div className={styles.header}>检测时间XXXXXXXXX</div>}
				>
					<div className={styles.today_run_count}>
						<IconFont type='icon-run' className={styles.icon} />
						<span>
							今日步数
							<span className={styles.count}>123</span>步
						</span>
						<div>
							<span className={styles.status}>达标</span>
						</div>
						<div className={styles.target}>目标步数 10000 步</div>
					</div>
				</Card>
				<Card size='small' className={styles.test_about}>
					<div className={styles.about_header}>
						<BulbOutlined className={styles.icon} />
						关于步数
					</div>
					<div className={styles.about_content}>
						步数指您一天中走了多少步，计步器和数字运动追踪器可以帮助您确定步数，这类设备会为所有产生步数的活动计算步数，如走路、跑步、上下楼梯、越野滑雪甚至做家务活等活动
					</div>
					<div className={styles.about_header}>
						<BulbOutlined className={styles.icon} />
						关于运动距离
					</div>
					<div className={styles.about_content}>
						运动距离是系统根据您的累计步数做出的估算，它不表示您在某段时间内行进的地理距离。
					</div>
					<div className={styles.about_header}>
						<BulbOutlined className={styles.icon} />
						关于消耗热量
					</div>
					<div className={styles.about_content}>
						消耗热量是系统根据您的累计步数做出的估算，它反映了您的活动量所对应的大概能量消耗。
					</div>
				</Card>
			</div>
		</div>
	)
}

export default SportRecord
