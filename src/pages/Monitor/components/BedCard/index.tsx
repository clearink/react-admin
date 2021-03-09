import React, { memo, useContext } from "react"
import classNames from "classnames"
import { Card, message, Progress } from "antd"
import styles from "./style.module.scss"
import IconFont from "@/components/IconFont"
import { Link, useHistory } from "react-router-dom"
import { BedItem, MonitorServiceContext } from "../../useMonitor.service"

// 用户 Card
export interface BedCardProps {
	item: BedItem
}
function BedCard(props: BedCardProps) {
	const { item } = props
	const { push } = useHistory()
	const { toggle, setBedItem } = useContext(MonitorServiceContext)
	const handleBcgDetail = () => {
		if (item?.memberId) {
			toggle()
			setBedItem!(item)
		} else {
			message.warning({
				key: "no-people",
				content: "空床位",
			})
		}
	}
	const handleDetail = () => {
		if (item?.memberId) {
			push({
				pathname: `/monitor/sleep/${item!.memberId}`,
				search: `?device=${item?.deviceNum}`,
			})
		} else {
			message.warning({
				key: "no-people",
				content: "空床位",
			})
		}
	}
	return (
		<Card
			size='small'
			className={styles.bed_card}
			title={item?.num}
			actions={[
				<div key='bcg' className={styles.action_wrap} onClick={handleBcgDetail}>
					<IconFont className={styles.icon} type='icon-user' />
					<span>心率/呼吸</span>
				</div>,
				<div onClick={handleDetail} className={styles.action_wrap} key='sleep'>
					<IconFont className={styles.icon} type='icon-user' />
					<span>睡眠报告</span>
				</div>,
			]}
		>
			<div className={styles.bed_info}>
				<span
					className={classNames(styles.bed_status, {
						[styles.in_bed]: item?.deviceStatus === "在床",
						[styles.leave_bed]: item?.deviceStatus === "离床",
					})}
				>
					<IconFont type='icon-user' style={{ fontSize: "20px" }} />
					<span>{item?.deviceStatus}</span>
				</span>
				<div className={styles.percent_name}>
					<span className={styles.name}>{item?.memberName || "空床位"}</span>
					<Progress
						showInfo
						strokeColor={{
							"0%": "#108ee9",
							"100%": "#87d068",
						}}
						status='active'
						percent={item?.sleepScore ?? 0}
						width={70}
						strokeWidth={12}
						type='circle'
						format={(v) => v}
					/>
				</div>
				<Link
					to='/monitor/alarm'
					className={classNames(styles.bed_status, {
						[styles.leave_bed]: item?.alarmStatus,
					})}
				>
					<IconFont type='icon-user' style={{ fontSize: "20px" }} />
					<span>告警</span>
				</Link>
			</div>
		</Card>
	)
}

export default memo(BedCard)
