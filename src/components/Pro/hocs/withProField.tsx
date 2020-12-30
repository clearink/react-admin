import withDefaultProps from "@/hocs/withDefaultProps"
import { ComponentType, memo } from "react"
import { BaseProFieldProps } from "../ProField/type"

export default function withProField<T extends BaseProFieldProps>(
	Field: ComponentType<T>,
	config?: Partial<T>
) {
	return memo(withDefaultProps(Field, { mode: "read", ...config }))
}
