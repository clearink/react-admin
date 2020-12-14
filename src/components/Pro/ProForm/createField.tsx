import React, { FC, memo } from "react"
import { Form } from "antd"
import { FormItemProps } from "antd/lib/form"
import { FieldType } from "../ProField/components/type"
import { BaseFormProps, ProFormItemProps } from "./components/BaseForm/type"

export type extendProps = Omit<BaseFormProps, "form"> & FormItemProps & {}

export default function createField<F extends ProFormItemProps = any>(
	Field: React.ComponentType<F> | React.ForwardRefExoticComponent<F>,
	config: FormItemProps & { field: FieldType }
) {
	const { field } = config
	const FieldWithFormItem: FC<F> = (props: F & extendProps) => {
		console.log(
			"	const FieldWithFormItem: FC<F> = (props: F & extendProps) => {",
			props
		)
		const { fieldProps, placeholder, ...formItemRest } = props
		// 去除 FormItemProps 属性
		return (
			<Form.Item {...formItemRest}>
				<Field
					field={field}
					mode='edit'
					{...props}
					fieldProps={fieldProps}
					placeholder={placeholder}
				/>
			</Form.Item>
		)
	}
	return memo(FieldWithFormItem)
}
