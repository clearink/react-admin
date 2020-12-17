import { InputProps } from "antd/lib/input"
import React, { forwardRef, Ref } from "react"
import { FieldText } from "../../ProField"
import createField, { ProFormItemProps } from "../createField"

function ProFormText(props: ProFormItemProps<InputProps>, ref: Ref<any>) {
	const { fieldProps, ...rest } = props
	return <FieldText ref={ref} mode='edit' />
}

export default createField<ProFormItemProps<InputProps>>(
	forwardRef(ProFormText),
	{
		field: "text",
	}
)
