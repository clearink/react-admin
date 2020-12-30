import React, { memo } from "react"
import Rate, { RateProps } from "antd/lib/rate"
import { BaseProFieldProps } from "../type"
import withDefaultProps from "@/hocs/withDefaultProps"

interface FieldRateProps extends RateProps, BaseProFieldProps<FieldRateProps> {
	text?: RateProps["value"]
}
function FieldRate(props: FieldRateProps) {
	const { text, render, ...rest } = props
	const DOM = <Rate value={text} {...rest} />
	if (render) return render({ text, ...rest }, DOM)
	return DOM
}
export default memo(withDefaultProps(FieldRate, { allowHalf: true }))
