import React, { memo, ReactNode, useMemo } from "react"
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
	markStep: number // 刻度线 步长
	children?: ReactNode
}
const defaultProps = {
	vertical: false,
	step: 5,
	start: 0,
	end: 10,
	markStep: 10,
}
function _TickMark(props: IProps) {
	const { vertical, markStep, step, start, end } = props
	const length = useMemo(() => Math.ceil((end - start) / markStep), [
		end,
		start,
		markStep,
	])
	return (
		<div
			className={classNames(styles["tick-mark-container"], "flex", {
				"flex-col": vertical,
			})}
		>
			<div
				className={classNames("flex justify-between", {
					"flex-col": vertical,
				})}
				style={{
					flexBasis: `${end - start}px`,
				}}
			>
				{Array.from({ length }, (_, i) => {
					console.log(i * markStep)
					const isMark = (i * markStep) % step === 0
					return (
						<div className={classNames(styles.tick__wrap)} key={i}>
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
