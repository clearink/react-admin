import React, { memo } from "react"
import { Input, Typography } from "antd"
import withDefaultProps from "@/hocs/withDefaultProps"
import { TextAreaProps } from "antd/lib/input"
import { ParagraphProps } from "antd/lib/typography/Paragraph"
import { BaseProFieldProps } from "../../type"
import "./style.scss"

export interface FieldCodeProps extends BaseProFieldProps, ParagraphProps {
	formItemProps?: Omit<TextAreaProps, "code">
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
	const formItemDom = (
		<Input.TextArea placeholder='请输入' rows={10} {...formItemProps} />
	)
	if (renderFormItem)
		return renderFormItem(
			// rest?.value ?? text,
			text,
			{ mode, ...rest, ...formItemProps },
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
