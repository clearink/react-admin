import withDefaultProps from "@/hocs/withDefaultProps"
import { FormItemProps } from "antd/lib/form"
import { InputProps } from "antd/lib/input"
import React, { forwardRef, Ref } from "react"
import FieldText from "../../ProField/components/FieldText"
import createField from "../createField"
import { ProFormItemProps } from "./BaseForm/type"

function ProFormText(props: ProFormItemProps<InputProps>, ref: Ref<any>) {
	const { fieldProps } = props
	return <FieldText mode='edit' ref={ref} fieldProps={fieldProps ?? {}} />
}

export default createField<ProFormItemProps<InputProps>>(
	withDefaultProps(forwardRef(ProFormText), {
		fieldProps: {},
	}),
	{
		field: "text",
	}
)
