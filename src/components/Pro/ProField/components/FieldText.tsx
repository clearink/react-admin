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
		InputProps {
	textType?: TextProps["type"]
	value?: string
}

function FieldText(props: FieldTextProps) {
	const { mode, render, renderFormItem, value, ...rest } = props
	const editProps = FilterValue(rest, ...TextPropsArray)
	const readProps = GetValue(
		rest,
		...TextPropsArray,
		"className",
		"style",
		"disabled"
	)
	console.log("editProps", editProps)
	if (mode === "read") {
		const dom = (
			<Typography.Text {...readProps} type={readProps.textType}>
				{value}
			</Typography.Text>
		)
		if (render) return render(value, { mode, ...readProps }, dom)
		return dom
	}
	const formItemDom = (
		<Input placeholder='请输入' value={value} {...editProps} />
	)
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

const TextPropsArray = [
	"code",
	"copyable",
	"delete",
	"editable",
	"ellipsis",
	"keyboard",
	"mark",
	"strong",
	"textType",
	"underline",
]
