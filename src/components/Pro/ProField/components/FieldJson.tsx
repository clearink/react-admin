import React, { memo, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import FieldCode from "./FieldCode"
import { FieldCodeProps } from "./FieldCode"

// 自动将text json 格式化

interface FieldJsonProps extends FieldCodeProps {
	value: string
	space: number
}
function FieldJson(props: FieldJsonProps) {
	const { value, space, ...rest } = props
	const jsonText = useMemo(() => {
		try {
			return JSON.stringify(JSON.parse(value), null, space)
		} catch (error) {
			return value
		}
	}, [space, value])
	return <FieldCode value={jsonText} {...rest} />
}
export default memo(
	withDefaultProps(FieldJson, {
		value: "",
		space: 2,
		mode: "read",
	})
)
