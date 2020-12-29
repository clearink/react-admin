import React, { forwardRef, memo, Ref } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { InputNumber } from "antd"
import { InputNumberProps } from "antd/lib/input-number"
import { BaseProFieldProps } from "../type"
import { formatNumber } from "../../utils"
import withProField from "../../hocs/withProField"

export interface FieldDigitProps extends BaseProFieldProps {
	text: number
	formItemProps?: InputNumberProps
}
const defaultFormItemProps: InputNumberProps = {
	placeholder: "请输入",
	min: 0,
	style: { width: 200 },
}
function FieldDigit(props: FieldDigitProps, ref: Ref<any>) {
	const { text, mode, render, renderFormItem, formItemProps, ...rest } = props

	if (mode === "read") {
		const dom = <span>{formatNumber(text)}</span>
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	// 渲染 form
	const formItemDom = (
		<InputNumber {...defaultFormItemProps} {...rest} {...formItemProps} />
	)
	if (renderFormItem)
		return renderFormItem(
			text,
			{ mode, ...rest, ...formItemProps },
			formItemDom
		)
	return formItemDom
}

export default withProField(FieldDigit, {
	text: 0,
	formItemProps: defaultFormItemProps,
})
