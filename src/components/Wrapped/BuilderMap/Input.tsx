import React, { memo, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Cell, Input } from "zarm"
import styles from "./style.module.scss"
interface IProps {
	title?: string
	showLength: boolean
	clearable: boolean
	autoHeight: boolean
	[key: string]: any
}
// zarm input 封装
// 因为 clearable 只能在rows 不存在且 type='text'时使用
// 舍弃 , 现阶段 只在form中使用
function WrappedInput(props: IProps) {
	const {
		title,

		...rest
	} = props

	return (
		<Cell title={title} className={styles.input_wrap}>
			<Input {...rest} className={styles.input} />
		</Cell>
	)
}

export default memo(withDefaultProps(WrappedInput, {}))
