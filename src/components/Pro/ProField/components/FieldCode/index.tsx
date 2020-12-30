import React, { memo } from "react"
import { Input, Typography } from "antd"
import { TextAreaProps } from "antd/lib/input"
import { ParagraphProps } from "antd/lib/typography/Paragraph"
import { BaseProFieldProps } from "../../type"
import withProField from "@/components/Pro/hocs/withProField"
import "./style.scss"
import FilterValue from "@/utils/FilterValue"
import GetValue from "@/utils/GetValue"
import withDefaultProps from "@/hocs/withDefaultProps"

export interface FieldCodeProps extends BaseProFieldProps, ParagraphProps {
	formItemProps?: TextAreaProps
	text: string
}
const defaultFormItemProps = {
	placeholder: "请输入代码",
	rows: 10,
}

function FieldCode(props: FieldCodeProps) {
	const { mode, render, renderFormItem, text, formItemProps, ...rest } = props
	if (mode === "read") {
		const dom = (
			<Typography.Paragraph {...rest}>
				<pre className={"field_code_container"}>
					<code>{text}</code>
				</pre>
			</Typography.Paragraph>
		)
		if (render) return render(text, { mode, ...rest }, dom)
		return dom
	}
	const editProps = { ...defaultFormItemProps, ...formItemProps }
	const formItemDom = <Input.TextArea {...editProps} />
	if (renderFormItem)
		return renderFormItem(text, { mode, ...editProps }, formItemDom)
	return formItemDom
}
export default memo(
	withDefaultProps(FieldCode, {
		text: "",
		mode: "read",
	})
)
