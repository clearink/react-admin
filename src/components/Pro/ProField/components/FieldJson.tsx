import React, { useMemo } from "react"
import FieldCode from "./FieldCode"
import { FieldCodeProps } from "./FieldCode"
import withProField from "../../hocs/withProField"

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
export default withProField(FieldJson, {
	text: "",
	space: 2,
})
