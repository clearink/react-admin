import classNames from "classnames"
import React, { ReactNode, useRef } from "react"
import styles from "./style.module.scss"
import usePercent from "./usePercent"

export interface BloodOxyBarProps {
	title: string
	base: number // 基准线
	data: Array<{ title: string; value: number; color: string }> // 总的值
	description?: ReactNode
	className?: string
}
// 血氧组件

function BloodOxyBar(props: BloodOxyBarProps) {
	let { title, base, data, description, className } = props
	const percentList = usePercent(base, data)
	return (
		<main className={classNames(styles.main, className)}>
			{title && <h3 className={styles.title}>{title}</h3>}
			<ul className={styles.bar_list_wrap}>
				{data.map((item, index) => (
					<li className={styles.bar_item} key={index}>
						<div
							className={styles.bar}
							style={{
								backgroundColor: item.color,
								height: `${percentList[index].toFixed(2)}%`,
							}}
						>
							{item.value}
						</div>
						<p className={styles.text}>{item.title}</p>
					</li>
				))}
			</ul>
			{description && <div className={styles.description}>{description}</div>}
		</main>
	)
}

export default BloodOxyBar
