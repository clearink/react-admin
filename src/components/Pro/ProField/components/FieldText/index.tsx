import React from "react"
import { Input, Typography } from "antd"
import { InputProps } from "antd/lib/input"
import { TextProps } from "antd/lib/typography/Text"
import { BaseProFieldProps } from "../../type"
import withProField from "@/components/Pro/hocs/withProField"
/**
 * 对于同时继承 两个 组件的情况
 * 如何结局
 */
export interface FieldTextProps extends BaseProFieldProps, TextProps {
	formItemProps?: InputProps
}
const defaultFormItemProps = {
	placeholder: "请输入",
	allowClear: true,
}
function FieldText(props: FieldTextProps) {
	const { text, mode, render, renderFormItem, formItemProps, ...rest } = props
	if (mode === "read") {
		const dom = <Typography.Text {...rest}>{text}</Typography.Text>
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	const formItemDom = (
		<Input {...defaultFormItemProps} {...rest} {...formItemProps} />
	)
	if (renderFormItem)
		return renderFormItem(
			text,
			{ mode, ...rest, ...formItemProps },
			formItemDom
		)
	return formItemDom
}
export default withProField(FieldText, { text: "" })
