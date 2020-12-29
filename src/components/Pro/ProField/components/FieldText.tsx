import React, { memo } from "react"
import { Input, Typography } from "antd"
import { InputProps } from "antd/lib/input"
import { BaseProFieldProps } from "../type"
import withDefaultProps from "@/hocs/withDefaultProps"
import { TextProps } from "antd/lib/typography/Text"
import FilterValue from "@/utils/FilterValue"
import GetValue from "@/utils/GetValue"
/**
 * 对于同时继承 两个 组件的情况
 * 如何结局
 */
export interface FieldTextProps
	extends BaseProFieldProps,
		Omit<TextProps, "type">,
		Omit<InputProps, "type"> {
	type?: TextProps["type"] & InputProps["type"]
	value?: string
}

function FieldText(props: FieldTextProps) {
	const { mode, render, renderFormItem, value, ...rest } = props
	const editProps = FilterValue(rest, TextPropsArray)
	const readProps = GetValue(rest, [
		...TextPropsArray,
		"className",
		"style",
		"type",
	])
	if (mode === "read") {
		const dom = <Typography.Text {...readProps}>{value}</Typography.Text>
		if (render) return render(value, { mode, ...readProps }, dom)
		return dom
	}
	const formItemDom = <Input placeholder='请输入' {...editProps} />
	if (renderFormItem)
		return renderFormItem(value, { mode, ...rest }, formItemDom)
	return formItemDom
}
export default memo(
	withDefaultProps(FieldText, {
		mode: "read",
		allowClear: true,
		value: "",
	})
)

const TextPropsArray: Array<keyof TextProps> = [
	"code",
	"copyable",
	"delete",
	"disabled",
	"editable",
	"ellipsis",
	"keyboard",
	"mark",
	"strong",
	"underline",
]
