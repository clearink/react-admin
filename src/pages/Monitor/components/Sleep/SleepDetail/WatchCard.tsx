import React from "react"
import classNames from "classnames"
import withDefaultProps from "@/hocs/withDefaultProps"
import styles from "./style.module.scss"

export interface WatchCardProps {
	icon?: JSX.Element
	count: number
	title: string
	color: string
	className?: string
}
function WatchCard(props: WatchCardProps) {
	const { icon, count, title, color, className } = props
	return (
		<div
			className={classNames(className, styles.watch_card)}
			style={{ backgroundColor: color }}
		>
			{icon}
			<div className='flex flex-col'>
				<span className={styles.count}>{count}</span>
				<span className={styles.title}>{title}</span>
			</div>
		</div>
	)
}

export default withDefaultProps(WatchCard, { count: 0 })
