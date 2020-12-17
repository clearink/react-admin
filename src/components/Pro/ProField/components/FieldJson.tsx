import React, { memo, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import FieldCode from "./FieldCode"
import { FieldCodeProps } from "./FieldCode"

// 自动将text json 格式化

interface FieldJsonProps extends FieldCodeProps {
	text: string
	space: number
}
function FieldJson(props: FieldJsonProps) {
	const { text, space, ...rest } = props
	const jsonText = useMemo(() => {
		try {
			return JSON.stringify(JSON.parse(text), null, space)
		} catch (error) {
			return text
		}
	}, [space, text])
	return <FieldCode text={jsonText} {...rest} />
}
export default memo(
	withDefaultProps(FieldJson, {
		text: "",
		space: 2,
		mode: "read",
	})
)
