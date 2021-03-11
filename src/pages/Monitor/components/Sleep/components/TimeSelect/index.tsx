import withDefaultProps from "@/hocs/withDefaultProps"
import { isUndefined } from "@/utils/data/validate"
import { RightOutlined } from "@ant-design/icons"
import { Empty } from "antd"
import classNames from "classnames"
import React, {
	CSSProperties,
	ReactNode,
	useLayoutEffect,
	useState,
} from "react"
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
	extra?: ReactNode
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
		extra,
	} = props
	const [innerValue, setInnerValue] = useState<OptionItem["value"]>(undefined)
	useLayoutEffect(() => {
		setInnerValue(value)
	}, [value])

	const handleClick = (item: OptionItem) => {
		// 没有onChange 或者 value 是 undefined
		if (!onChange || isUndefined(value)) {
			setInnerValue(item.value)
		}
		if (onChange) onChange(item.value, item)
		if (loadData) loadData(item)
	}
	if (render)
		return (
			<div
				className={classNames(styles.select_wrap, className)}
				style={{ height }}
			>
				{render(options)}
			</div>
		)
	return (
		<div
			className={classNames(styles.select_wrap, className)}
			style={{ height }}
		>
			{options?.length === 0 && <Empty />}
			{options.map((item) => {
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
						<span className={styles.text}>{item.label}</span>
						<RightOutlined className={styles.icon} />
					</div>
				)
			})}
			{extra && <div className={styles.extra}>{extra}</div>}
		</div>
	)
}
export default withDefaultProps(TimeSelect, {
	options: [],
	height: 300,
})
