import React, { memo } from "react"
import { Input, Typography } from "antd"
import { InputProps } from "antd/lib/input"
import { BaseProFieldProps } from "../type"
import withDefaultProps from "@/hocs/withDefaultProps"
import { TextProps } from "antd/lib/typography/Text"

export interface FieldTextProps extends BaseProFieldProps, TextProps {
	formItemProps: InputProps
}

function FieldText(props: FieldTextProps) {
	const { mode, render, renderFormItem, text, formItemProps, ...rest } = props
	if (mode === "read") {
		const dom = <Typography.Text {...rest}>{text}</Typography.Text>
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	const formItemDom = <Input placeholder='请输入' {...formItemProps} />
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
