import { InputProps } from "antd/lib/input"
import React, { forwardRef, Ref } from "react"
import ProField from "../../ProField"
import createField, { ProFormItemProps } from "../createField"

function ProFormText(props: ProFormItemProps<InputProps>, ref: Ref<any>) {
	const { fieldProps, ...rest } = props
	return (
		<ProField
			ref={ref}
			field='text'
			mode='edit'
			fieldProps={fieldProps ?? {}}
			{...rest}
		/>
	)
}

export default createField<ProFormItemProps<InputProps>>(
	forwardRef(ProFormText),
	{
		field: "text",
	}
)
