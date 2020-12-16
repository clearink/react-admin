import withDefaultProps from "@/hocs/withDefaultProps"
import React, { forwardRef, memo, ReactNode, Ref, useMemo } from "react"
import { FieldType, ProFieldType, ProFieldProps } from "./components/type"
import { OmitUndefined, pickProFieldProps } from "./utils"
import renderField from "./renderField"
/**
 * 仿 antd 的 pro field
 * 根据 field 字段去FieldMap中匹配组件
 */

export interface TProFieldProps extends ProFieldProps {
	field: ProFieldType
	value?: any
	filedProps?: any
	onChange?: (value: any) => void
}
function ProField(props: TProFieldProps, ref: Ref<any>) {
	const { field, text, value, onChange, ...rest } = props
	let type: FieldType
	let fieldProps = useMemo(
		() => OmitUndefined({ value, onChange, ...rest?.filedProps }),
		[value, onChange, rest]
	)
	if (typeof field === "string") type = field
	else {
		const { type: fieldType, ...rest } = field
		type = fieldType as FieldType
		fieldProps = { ...fieldProps, ...rest }
	}
	return (
		<>
			{renderField(text ?? fieldProps?.value, type, {
				...rest,
				ref,
				fieldProps: pickProFieldProps(fieldProps),
			})}
		</>
	)
}
export default memo(
	withDefaultProps(forwardRef(ProField), {
		text: "",
		field: "text",
		mode: "read",
	})
)
