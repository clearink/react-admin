import React, { memo } from "react"
import { Typography } from "antd"
import { TextProps } from "antd/lib/typography/Text"
import { BaseProFieldProps } from "../type"

interface FieldTextProps extends TextProps, BaseProFieldProps<FieldTextProps> {
	text: TextProps["children"]
}
function FieldText(props: FieldTextProps) {
	const { text, render, ...rest } = props
	const DOM = <Typography.Text children={text} {...rest} />
	if (render) return render({ text, ...rest }, DOM)
	return DOM
}
export default memo(FieldText)
