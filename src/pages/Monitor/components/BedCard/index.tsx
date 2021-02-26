import React, { memo, useContext } from "react"
import classNames from "classnames"
import { Card, Progress, Space } from "antd"
import styles from "./style.module.scss"
import { CardProps } from "antd/lib/card"
import IconFont from "@/components/IconFont"
import { BCGContext } from "../.."
import { Link } from "react-router-dom"

interface BedCardProps extends CardProps {
	memberName: string
	sleepScore: number
	deviceStatus: string
	num: string
}
// 用户 Card
function BedCard(props: BedCardProps) {
	const { memberName, sleepScore, deviceStatus, num } = props

	const { toggle, setBcgId } = useContext(BCGContext)
	const handleBcgDetail = () => {
		toggle()
		setBcgId?.(1)
	}

	return (
		<Card
			size='small'
			className={styles.bed_card}
			title={num}
			actions={[
				<Space size={2} key='bcg' className='action_wrap'>
					<IconFont type='icon-user' />
					<span onClick={handleBcgDetail}>心率/呼吸</span>
				</Space>,
				<Space size={2} key='sleep' className='action_wrap'>
					<IconFont type='icon-user' />
					<Link to={`/monitor/sleep/${1}`}>睡眠报告</Link>
				</Space>,
			]}
			{...props}
		>
			<div className={styles.bed_info}>
				<span
					className={classNames(styles.bed_status, {
						[styles.in_bed]: deviceStatus === "在床",
						[styles.leave_bed]: deviceStatus === "离床",
					})}
				>
					<IconFont type='icon-user' style={{ fontSize: "20px" }} />
					<span>{deviceStatus}</span>
				</span>
				<div className={styles.percent_name}>
					<span className={styles.name}>{memberName || "空床位"}</span>
					<Progress
						showInfo
						strokeColor={{
							"0%": "#108ee9",
							"100%": "#87d068",
						}}
						status='active'
						percent={sleepScore ?? 0}
						width={70}
						strokeWidth={12}
						type='circle'
						format={(v) => v}
					/>
				</div>
				<span
					className={classNames(styles.bed_status, {
						[styles.leave_bed]: Math.random() > 0.5,
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
