import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Rate } from "antd"
import { BaseProFieldProps } from "../type"
import { RateProps } from "antd/lib/rate"

interface FieldRateProps extends BaseProFieldProps, RateProps {}
// 评分
function FieldRate(props: FieldRateProps, ref: Ref<any>) {
	const { text, mode, render, renderFormItem, ...rest } = props
	const allow = mode === "read" // 是否允许编辑
	const dom = <Rate disabled={allow} defaultValue={text} {...rest} />
	if (mode === "read") {
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	if (renderFormItem) renderFormItem(text, { mode, ...rest }, dom)
	return dom
}

export default memo(
	withDefaultProps(forwardRef(FieldRate), {
		text: 0,
		mode: "read",
		allowHalf: true,
		allowClear: true,
	})
)
