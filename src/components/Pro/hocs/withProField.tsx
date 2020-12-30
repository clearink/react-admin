import withDefaultProps from "@/hocs/withDefaultProps"
import { ComponentType, memo } from "react"

export default function withProField<P = {}, D = {}>(
	Field: ComponentType<P>,
	config: D = {} as D
) {
	return memo(withDefaultProps(Field, { mode: "read", ...config }))
}
