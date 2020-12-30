import React, { memo } from "react"
import { formatNumber } from "../../utils"
import withDefaultProps from "@/hocs/withDefaultProps"
import { BaseProFieldProps } from "../type"

export interface FieldDigitProps extends BaseProFieldProps<FieldDigitProps> {
	text?: number
}
function FieldDigit(props: FieldDigitProps) {
	const { text, render } = props

	const DOM = <span>{formatNumber(text ?? 0)}</span>
	if (render) return render({ text }, DOM)
	return DOM
}

export default memo(withDefaultProps(FieldDigit, { text: 0 }))
