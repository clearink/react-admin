import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Rate } from "antd"
import { BaseProFieldProps } from "../type"
import { RateProps } from "antd/lib/rate"
import withProField from "../../hocs/withProField"

interface FieldRateProps extends BaseProFieldProps, RateProps {
	text?: number
}
// 评分
function FieldRate(props: FieldRateProps) {
	const { value, mode, render, renderFormItem, ...rest } = props
	const allow = mode === "read" // 是否允许编辑
	const dom = <Rate disabled={allow} value={value} {...rest} />
	if (mode === "read") {
		if (render) return render(value, { mode, ...rest }, dom)
		return dom
	}
	if (renderFormItem) return renderFormItem(value, { mode, ...rest }, dom)
	return dom
}

export default withProField(FieldRate, {
	text: 0,
	allowHalf: true,
})

/**
 *
 */
