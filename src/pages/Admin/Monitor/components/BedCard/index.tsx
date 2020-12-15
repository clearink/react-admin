import React, { useContext } from "react"
import classNames from "classnames"
import { Card, Progress, Space } from "antd"
import styles from "./style.module.scss"
import { CardProps } from "antd/lib/card"
import { PepLifeIcon } from "@/components/IconFont"
import { BCGContext } from "../.."
import { Link } from "react-router-dom"

interface BedCardProps extends CardProps {}
// 用户 Card
function BedCard(props: BedCardProps) {
	const { title } = props
	const { toggle, setBcgId } = useContext(BCGContext)
	const handleBcgDetail = () => {
		toggle()
		setBcgId?.(1)
	}
	return (
		<Card
			size='small'
			className={styles.bed_card}
			title={title}
			actions={[
				<Space size={2} key='bcg' className='action_wrap'>
					<PepLifeIcon type='icon-user' />
					<span onClick={handleBcgDetail}>心率呼吸BCG</span>
				</Space>,
				<Space size={2} key='sleep' className='action_wrap'>
					<PepLifeIcon type='icon-user' />
					<Link to={`/monitor/sleep/${1}`}>睡眠报告</Link>
				</Space>,
			]}
			{...props}
		>
			<div className={styles.bed_info}>
				<span className={classNames(styles.bed_status, styles.in_bed)}>
					<PepLifeIcon type='icon-user' />
					<span>在床</span>
				</span>
				<div className={styles.percent_name}>
					<span className={styles.name}>张三丰</span>
					<Progress
						showInfo
						strokeColor={{
							"0%": "#108ee9",
							"100%": "#87d068",
						}}
						status='active'
						percent={40}
						width={70}
						strokeWidth={12}
						type='circle'
						format={(v) => v}
					/>
				</div>
				<span className={classNames(styles.bed_status, styles.leave_bed)}>
					<PepLifeIcon type='icon-user' />
					<span>告警</span>
				</span>
			</div>
		</Card>
	)
}

export default BedCard
