import withDefaultProps from "@/hocs/withDefaultProps"
import React, { memo, ReactNode, useMemo } from "react"
import styles from "./style.module.scss"
// 刻度线组件 默认水平
// px

interface IProps {
	step: number //  步长
	end: number
	vertical: boolean // 是否垂直
	start: number
	children?: ReactNode
}
const defaultProps = {
	vertical: false,
	step: 5,
	start: 0,
	end: 10,
}
function _TickMark(props: IProps) {
	const { vertical, step, start, end } = props
	const length = useMemo(() => Math.ceil((end - start) / step), [
		end,
		start,
		step,
	])
	return (
		<div
			style={{
				flexBasis: `${end -start}px`,
				display: vertical ? "block" : "flex",
				justifyContent: "space-between",
			}}
		>
			{Array.from({ length }, (_, i) => {
				return (
					<div className={styles.tick__wrap} key={i}>
						{i * step}
					</div>
				)
			})}
		</div>
	)
}

const TickMark = withDefaultProps(memo(_TickMark), defaultProps)
export default TickMark
