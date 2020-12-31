import React, { memo, useMemo } from "react"
import { Typography } from "antd"
import { ParagraphProps } from "antd/lib/typography/Paragraph"
import { BaseProFieldProps } from "../../type"
import withDefaultProps from "@/hocs/withDefaultProps"
import "./style.scss"
import toNumber from "lodash.tonumber"
import { isString } from "@/utils/validate"

export interface FieldCodeProps
	extends ParagraphProps,
		BaseProFieldProps<FieldCodeProps> {
	text?: ParagraphProps["children"]
	/** json格式的空格 不设置为 code 渲染 */
	jsonSpace?: number
}
// JSON 与 Code
function FieldCode(props: FieldCodeProps) {
	const { text, jsonSpace, render, ...rest } = props
	const code = useMemo(() => {
		if (jsonSpace === undefined) return text
		if (!isString(text)) return text
		try {
			return JSON.stringify(JSON.parse(text), null, toNumber(jsonSpace))
		} catch (error) {
			return text
		}
	}, [text, jsonSpace])
	const DOM = (
		<Typography.Paragraph {...rest}>
			<pre className={"field_code_container"}>
				<code>{code}</code>
			</pre>
		</Typography.Paragraph>
	)
	if (render) return render({ text, jsonSpace, ...rest }, DOM)
	return DOM
}
export default memo(withDefaultProps(FieldCode, { text: "" }))
