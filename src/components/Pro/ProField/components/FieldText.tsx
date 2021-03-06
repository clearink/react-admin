import React, { memo } from "react"
import { Typography } from "antd"
import { TextProps } from "antd/lib/typography/Text"
import { BaseProFieldProps } from "../type"

export interface FieldTextProps
	extends TextProps,
		BaseProFieldProps<FieldTextProps> {
	text?: TextProps["children"]
}
function FieldText(props: FieldTextProps) {
	const { text, render, copyable, ...rest } = props
	const DOM = (
		<Typography.Text
			children={text}
			{...rest}
			copyable={copyable ? { tooltips: false } : undefined}
		/>
	)
	if (render) return render({ text, ...rest }, DOM)
	return DOM
}
export default memo(FieldText)
