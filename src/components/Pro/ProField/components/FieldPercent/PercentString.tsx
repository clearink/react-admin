import React from "react"
import classNames from "classnames"
import { getPrecisionNumber, getSymbol } from "./utils"
interface PercentStringProps {
	text: number
	precision: number
	suffix?: React.ReactNode
	prefix?: React.ReactNode
	hasSymbol?: boolean // 是否有符号
	hasColor?: boolean
}
function PercentString(props: PercentStringProps) {
	const { text, precision, suffix, prefix, hasSymbol, hasColor } = props
	return (
		<span
			className={classNames({
				"pro_filed__percent--default": !hasColor,
				"pro_filed__percent--color1": text > 0,
				"pro_filed__percent--color2": text < 0,
			})}
		>
			{prefix && <span>{prefix}</span>}
			{hasSymbol && (
				<span className='pro_field__percent--symbol	'>{getSymbol(text)}</span>
			)}
			{getPrecisionNumber(hasSymbol ? Math.abs(text) : text, precision)}
			{suffix && <span>{suffix}</span>}
		</span>
	)
}

export default PercentString
