import withDefaultProps from "@/hocs/withDefaultProps"
import { ComponentType, memo } from "react"

export default function withProField<T extends object, D extends T>(
	Field: ComponentType<T>,
	options?: Partial<T>
) {
	return memo(
		withDefaultProps(Field, {
			mode: "read",
			...options,
		})
	)
}
