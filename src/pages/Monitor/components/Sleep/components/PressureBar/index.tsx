import React, { CSSProperties, ReactNode } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import styles from "./style.module.scss"
import classNames from "classnames"
import IconFont from "@/components/IconFont"
import useBarPercent from "./useBarPercent"

//血压条组件

export interface SeparatorItem {
	value: number //
	color: string //
	description?: ReactNode // 描述
	grow?: number // 占比
}
export interface PressureBarProps {
	title?: ReactNode
	separator: Array<SeparatorItem>
	value: number
	className?: string
	size: number
	style?: CSSProperties
}

function renderText(item: SeparatorItem, index: number, arr: SeparatorItem[]) {
	const isFirst = index === 0
	const isLasted = index === arr.length - 1
	const next = arr[index + 1]
	if (isFirst) return `< ${next.value}`
	if (isLasted) return `> ${item.value}`
	return `${item.value?.toFixed(1)} - ${next.value?.toFixed(1)}`
}

function PressureBar(props: PressureBarProps) {
	const { title, separator, value, className, style, size } = props
	const percent = useBarPercent(value, separator)
	return (
		<div className={classNames(styles.bar_wrap, className)} style={style}>
			{title && <h3 className={styles.title}>{title}</h3>}
			<div
				className={styles.location}
				style={{ transform: `translateX(${percent}%)` }}
			>
				<IconFont type='icon-location' className={styles.icon} />
			</div>
			<div className={styles.bar}>
				{separator.map((item, index, arr) => {
					return (
						<div
							key={item.value}
							className={styles.item_wrap}
							style={{
								flexGrow: item.grow ?? 1,
							}}
						>
							<div
								className={styles.item}
								style={{
									backgroundColor: item.color,
									height: size,
								}}
							>
								{renderText(item, index, arr)}
							</div>
							<div className={styles.description}>{item.description}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default withDefaultProps(PressureBar, {
	value: 0,
	size: 26,
})
