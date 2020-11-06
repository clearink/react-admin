import React, { CSSProperties, memo, ReactNode, useMemo } from "react"
import classNames from "classnames"
import withDefaultProps from "@/hocs/withDefaultProps"
import styles from "./style.module.scss"
// 刻度线组件 默认水平
// px

interface IProps {
	step: number //  步长
	end: number
	vertical: boolean // 是否垂直
	start: number
	className?: string
	style?: CSSProperties
	children?: ReactNode
}
const defaultProps = {
	vertical: false,
	step: 5,
	start: 0,
	end: 10,
}
function _TickMark(props: IProps) {
	const { vertical, step, start, end, style, className } = props

	// +1 是为了显示end标记
	const length = useMemo(() => Math.ceil((end - start) / step + 1), [
		end,
		start,
		step,
	])
	const markStep = useMemo(() => Math.floor(step / 10), [step])
	return (
		<div
			style={style}
			className={classNames(styles["tick-mark-container"], className, {
				"flex-col": vertical,
			})}
		>
			<div
				className={classNames(styles["tick-mark-wrap"], {
					"flex-col": vertical,
				})}
				style={{
					flexBasis: `${end - start}px`,
				}}
			>
				{Array.from({ length }, (_, i) => {
					const isMark = (i * markStep) % step === 0
					return (
						<div
							key={i}
							className={classNames(styles.tick__wrap, {
								[styles.vertical]: vertical,
								[styles.isMark]: isMark,
							})}
						>
							{isMark && <span>{i * markStep}</span>}
						</div>
					)
				})}
			</div>
		</div>
	)
}

const TickMark = withDefaultProps(memo(_TickMark), defaultProps)
export default TickMark
