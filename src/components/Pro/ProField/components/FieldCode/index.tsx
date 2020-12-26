import React, { memo } from "react"
import { Input, Typography } from "antd"
import withDefaultProps from "@/hocs/withDefaultProps"
import { TextAreaProps } from "antd/lib/input"
import { ParagraphProps } from "antd/lib/typography/Paragraph"
import { BaseProFieldProps } from "../../type"
import "./style.scss"
import FilterValue from "@/utils/FilterValue"
import GetValue from "@/utils/GetValue"

export interface FieldCodeProps
	extends BaseProFieldProps,
		ParagraphProps,
		Omit<TextAreaProps, "code"> {
	value: any
}

function FieldCode(props: FieldCodeProps) {
	const { mode, render, renderFormItem, value, ...rest } = props
	const editProps = FilterValue(rest, ...paragraphPropsArray)
	const readProps = GetValue(rest, ...paragraphPropsArray, "className", "style")
	if (mode === "read") {
		const dom = (
			<Typography.Paragraph {...readProps}>
				<pre className={"field_code_container"}>
					<code>{value}</code>
				</pre>
			</Typography.Paragraph>
		)
		if (render) return render(value, { mode, ...readProps }, dom)
		return dom
	}
	const formItemDom = (
		<Input.TextArea placeholder='请输入' rows={10} {...editProps} />
	)
	if (renderFormItem)
		return renderFormItem(
			// rest?.value ?? text,
			value,
			{ mode, ...editProps },
			formItemDom
		)
	return formItemDom
}
export default memo(
	withDefaultProps(FieldCode, {
		text: "",
		mode: "read",
	})
)
const paragraphPropsArray = [
	"code",
	"copyable",
	"delete",
	"disabled",
	"editable",
	"ellipsis",
	"keyboard",
	"mark",
	"strong",
	"textType",
	"underline",
]
