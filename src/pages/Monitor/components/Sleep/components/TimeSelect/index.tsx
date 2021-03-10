import withDefaultProps from "@/hocs/withDefaultProps"
import { RightOutlined } from "@ant-design/icons"
import classNames from "classnames"
import React, { CSSProperties, useLayoutEffect, useState } from "react"
import styles from "./style.module.scss"

// TODO: 多级结构如何处理?
export interface OptionItem {
	label: string | number | undefined
	value: string | number | undefined
	children?: OptionItem[]
}
export interface TimeSelectProps {
	options: Array<OptionItem>
	render?: (data: OptionItem[]) => React.ReactNode
	onChange?: (value: OptionItem["value"], item: OptionItem) => void
	loadData?: (treeNode: OptionItem) => void
	className?: string
	height: number
	value?: string
}
function TimeSelect(props: TimeSelectProps) {
	const {
		render,
		options,
		onChange,
		value,
		className,
		height,
		loadData,
	} = props
	const [innerValue, setInnerValue] = useState<OptionItem["value"]>(undefined)
	useLayoutEffect(() => {
		setInnerValue(value)
	}, [value])

	const handleClick = (item: OptionItem) => {
		if (onChange) onChange(item.value, item)
		else setInnerValue(item.value)
		if (loadData) loadData(item)
	}

	return (
		<div
			className={classNames(styles.select_wrap, className)}
			style={{ height }}
		>
			{render
				? render(options)
				: options.map((item) => {
						if (item.children)
							return <TimeSelect {...props} options={item.children} />
						return (
							<div
								key={item.value}
								onClick={() => handleClick(item)}
								className={classNames(styles.item_wrap, {
									[styles.active]: item.value === innerValue,
								})}
							>
								<span className={styles.text}>time</span>
								<RightOutlined className={styles.icon} />
							</div>
						)
				  })}
		</div>
	)
}
export default withDefaultProps(TimeSelect, {
	options: [],
	height: 300,
})
