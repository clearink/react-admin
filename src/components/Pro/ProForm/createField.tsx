import React, { ComponentType, CSSProperties, FC, memo } from "react"
import { Form, Input } from "antd"
import { FormItemProps } from "antd/lib/form"
import { FieldType } from "../ProField/components/type"
import { BaseFormProps } from "./components/BaseForm/type"

export type extendProps = Omit<BaseFormProps, "form"> & FormItemProps & {}

export interface ProFormItemProps<T = {}> extends FormItemProps {
	fieldProps?: { style?: CSSProperties } & T
	placeholder?: string
	allowClear?: boolean
	disabled?: boolean
}
// 给组件包裹一层 Form.Item
export default function createField<F extends ProFormItemProps = any>(
	Field: React.ComponentType<F> | React.ForwardRefExoticComponent<F>,
	config: FormItemProps & { field: FieldType }
) {
	const FormItemWithField: FC<F> = (props) => {
		const { field, ...defaultFormItemProps } = config
		const { placeholder, fieldProps, ...RestFormItemProps } = props
		return (
			<Form.Item {...RestFormItemProps}>
				<Field
					mode='edit'
					field={field}
					placeholder={placeholder}
					fieldProps={fieldProps}
					{...defaultFormItemProps}
					{...props}
				/>
			</Form.Item>
		)
	}
	return FormItemWithField
}

/**
 * field: FieldType;
 * mode: string;
 * fieldProps: any;
 * placeholder: string | undefined;
 */
