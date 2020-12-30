import React, { memo } from "react"
import { Typography } from "antd"
import { ParagraphProps } from "antd/lib/typography/Paragraph"
import { BaseProFieldProps } from "../../type"
import withDefaultProps from "@/hocs/withDefaultProps"
import "./style.scss"

export interface FieldCodeProps
	extends BaseProFieldProps<FieldCodeProps>,
		ParagraphProps {
	text?: ParagraphProps["children"]
}
function FieldCode(props: FieldCodeProps) {
	const { text, render, ...rest } = props

	const DOM = (
		<Typography.Paragraph {...rest}>
			<pre className={"field_code_container"}>
				<code>{text}</code>
			</pre>
		</Typography.Paragraph>
	)
	if (render) return render({ text, ...rest }, DOM)
	return DOM
}
export default memo(withDefaultProps(FieldCode, { text: "" }))
