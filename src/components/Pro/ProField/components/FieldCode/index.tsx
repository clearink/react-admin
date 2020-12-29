import React from "react"
import { Input, Typography } from "antd"
import { TextAreaProps } from "antd/lib/input"
import { ParagraphProps } from "antd/lib/typography/Paragraph"
import { BaseProFieldProps } from "../../type"
import withProField from "@/components/Pro/hocs/withProField"
import "./style.scss"

export interface FieldCodeProps extends BaseProFieldProps, ParagraphProps {
	formItemProps?: TextAreaProps
	text: string
}
const defaultFormItemProps = {
	placeholder: "请输入",
	rows: 10,
}

function FieldCode(props: FieldCodeProps) {
	const { text, mode, render, renderFormItem, formItemProps, ...rest } = props

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
	const formItemDom = (
		<Input.TextArea {...defaultFormItemProps} {...rest} {...formItemProps} />
	)
	if (renderFormItem)
		return renderFormItem(
			text,
			{ mode, ...formItemProps, ...rest },
			formItemDom
		)
	return formItemDom
}
export default withProField(FieldCode, {
	formItemProps: defaultFormItemProps,
})
