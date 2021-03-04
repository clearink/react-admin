import React, { memo, useContext } from "react"
import classNames from "classnames"
import { Card, message, Progress } from "antd"
import styles from "./style.module.scss"
import IconFont from "@/components/IconFont"
import { BCGContext } from "../.."
import { useHistory } from "react-router-dom"
import { MonitorServiceContext } from "../../useMonitor.service"

// 用户 Card
function BedCard() {
	const { bedItem } = useContext(MonitorServiceContext)
	const { push } = useHistory()
	const { toggle, setBedItem } = useContext(BCGContext)
	const handleBcgDetail = () => {
		if (bedItem?.deviceNum) {
			toggle()
			setBedItem!(bedItem)
		} else {
			message.warning({
				key: "no-device",
				content: "当前床位尚未绑定设备",
			})
		}
	}
	const handleDetail = () => {
		if (bedItem?.deviceNum) {
			push({
				pathname: `/monitor/sleep/${bedItem!.memberId}`,
				search: `?device=${bedItem!.deviceNum}`,
			})
		} else {
			message.warning({
				key: "no-people",
				content: "当前床位暂无数据",
			})
		}
	}
	return (
		<Card
			size='small'
			className={styles.bed_card}
			title={bedItem?.num}
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
						[styles.in_bed]: bedItem?.deviceStatus === "在床",
						[styles.leave_bed]: bedItem?.deviceStatus === "离床",
					})}
				>
					<IconFont type='icon-user' style={{ fontSize: "20px" }} />
					<span>{bedItem?.deviceStatus}</span>
				</span>
				<div className={styles.percent_name}>
					<span className={styles.name}>{bedItem?.memberName || "空床位"}</span>
					<Progress
						showInfo
						strokeColor={{
							"0%": "#108ee9",
							"100%": "#87d068",
						}}
						status='active'
						percent={bedItem?.sleepScore ?? 0}
						width={70}
						strokeWidth={12}
						type='circle'
						format={(v) => v}
					/>
				</div>
				<span
					className={classNames(styles.bed_status, {
						[styles.leave_bed]: bedItem?.alarmStatus,
					})}
				>
					<IconFont type='icon-user' style={{ fontSize: "20px" }} />
					<span>告警</span>
				</span>
			</div>
		</Card>
	)
}

export default memo(BedCard)
