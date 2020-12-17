import React, { memo } from "react"
import { Input } from "antd"
import { InputProps } from "antd/lib/input"
import { BaseProFieldProps } from "../type"
import withDefaultProps from "@/hocs/withDefaultProps"

interface FieldTextProps extends BaseProFieldProps, InputProps {}

function FieldText(props: FieldTextProps) {
	const { mode, render, renderFormItem, text, ...rest } = props
	if (mode === "read") {
		const dom = <span>{text}</span>
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	const formItemDom = <Input placeholder='请输入' {...rest} />
	if (renderFormItem)
		return renderFormItem(text, { mode, ...rest }, formItemDom)
	return formItemDom
}
export default memo(
	withDefaultProps(FieldText, {
		mode: "read",
		text: "",
	})
)
