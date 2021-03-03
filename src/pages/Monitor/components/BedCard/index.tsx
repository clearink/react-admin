import React, { memo, useContext } from "react"
import classNames from "classnames"
import { Button, Card, message, Progress, Space } from "antd"
import styles from "./style.module.scss"
import { CardProps } from "antd/lib/card"
import IconFont from "@/components/IconFont"
import { BCGContext, BedItem } from "../.."
import { Link, useHistory } from "react-router-dom"

interface BedCardProps extends CardProps {
	bedItem: BedItem
}
// 用户 Card
function BedCard(props: BedCardProps) {
	const { bedItem } = props
	const { push } = useHistory()
	const { toggle, setBedItem } = useContext(BCGContext)
	const handleBcgDetail = () => {
		toggle()
		setBedItem!(bedItem)
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
				<div key='bcg' className='action_wrap' onClick={handleBcgDetail}>
					<IconFont type='icon-user' />
					<span>心率/呼吸</span>
				</div>,
				<div onClick={handleDetail} className='action_wrap' key='sleep'>
					<IconFont type='icon-user' />
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
