import React, { memo } from "react"
import { formatNumber, formatSecond } from "../../utils"
import withDefaultProps from "@/hocs/withDefaultProps"
import { BaseProFieldProps } from "../type"

export interface FieldDigitProps extends BaseProFieldProps<FieldDigitProps> {
	text?: number
	/** 是否是时间 */
	second?: boolean
}
function FieldDigit(props: FieldDigitProps) {
	const { text, render, second } = props
	const DOM = (
		<span>{second ? formatSecond(text ?? 0) : formatNumber(text ?? 0)}</span>
	)
	if (render) return render({ text, second }, DOM)
	return DOM
}

export default memo(withDefaultProps(FieldDigit, { text: 0 }))
