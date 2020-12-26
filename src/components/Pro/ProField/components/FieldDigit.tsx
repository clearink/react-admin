import React, { forwardRef, memo, Ref } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { InputNumber } from "antd"
import { InputNumberProps } from "antd/lib/input-number"
import { BaseProFieldProps } from "../type"
import { formatNumber } from "../../utils"

export interface FieldDigitProps extends BaseProFieldProps, InputNumberProps {
	value: number
}
function FieldDigit(props: FieldDigitProps, ref: Ref<any>) {
	const { value, mode, render, renderFormItem, ...rest } = props

	if (mode === "read") {
		const dom = <span>{formatNumber(value)}</span>
		if (render) return render(value, { mode, ...rest }, dom)
		return dom
	}
	// 渲染 form
	if (renderFormItem)
		return renderFormItem(value, { mode, ...rest }, <>{value}</>)
	return <InputNumber {...rest} />
}

export default memo(
	withDefaultProps(forwardRef(FieldDigit), {
		value: 0,
		mode: "read",
		placeholder: "请输入",
		min: 0,
		style: { width: 200 },
	})
)
