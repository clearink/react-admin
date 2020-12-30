import React, { memo, useMemo } from "react"
import FieldCode from "./FieldCode"
import { FieldCodeProps } from "./FieldCode"
import withDefaultProps from "@/hocs/withDefaultProps"
import { BaseProFieldProps } from "../type"

// 自动将text json 格式化

interface FieldJsonProps
	extends Omit<FieldCodeProps, "render">,
		BaseProFieldProps<FieldJsonProps> {
	text: string
	space: number
}
function FieldJson(props: FieldJsonProps) {
	const { text, space, render, ...rest } = props
	const jsonText = useMemo(() => {
		try {
			return JSON.stringify(JSON.parse(text), null, space)
		} catch (error) {
			return text
		}
	}, [space, text])
	const DOM = <FieldCode text={jsonText} {...rest} />
	if (render) return render({ text, space, ...rest }, DOM)
	return DOM
}
export default memo(
	withDefaultProps(FieldJson, {
		text: "",
		space: 2,
	})
)
