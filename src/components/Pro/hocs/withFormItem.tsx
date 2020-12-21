// import React, { ComponentType, CSSProperties, FC, memo } from "react"
// import { Form, Input } from "antd"
// import { FormItemProps } from "antd/lib/form"
// import { BaseFormProps } from "./components/BaseForm/type"

// export type extendProps = Omit<BaseFormProps, "form"> & FormItemProps & {}

// export interface ProFormItemProps<T = {}> extends FormItemProps {
// 	fieldProps?: { style?: CSSProperties } & T
// 	placeholder?: string
// 	allowClear?: boolean
// 	disabled?: boolean
// }
// // 给组件包裹一层 Form.Item
// export default function createField<F extends ProFormItemProps = any>(
// 	Field: React.ComponentType<F> | React.ForwardRefExoticComponent<F>,
// 	config: FormItemProps & { field: string }
// ) {
// 	const FormItemWithField: FC<F> = (props) => {
// 		const { field, ...defaultFormItemProps } = config
// 		const { placeholder, fieldProps, ...RestFormItemProps } = props
// 		return (
// 			<Form.Item {...RestFormItemProps}>
// 				<Field
// 					mode='edit'
// 					field={field}
// 					placeholder={placeholder}
// 					fieldProps={fieldProps}
// 					{...defaultFormItemProps}
// 					{...props}
// 				/>
// 			</Form.Item>
// 		)
// 	}
// 	return FormItemWithField
// }

// /**
//  * field: FieldType;
//  * mode: string;
//  * fieldProps: any;
//  * placeholder: string | undefined;
//  */

import withDefaultProps from "@/hocs/withDefaultProps"
import FilterValue from "@/utils/FilterValue"
import GetValue from "@/utils/GetValue"
import { Form } from "antd"
import { FormItemProps } from "antd/lib/form"
import React, { ComponentType, memo } from "react"
import { BaseProFieldProps } from "../ProField/type"
// 将各种 ProField 包装一下
function withFormItem<T extends BaseProFieldProps>(
	Field: ComponentType<T>,
	options?: Partial<T>
) {
	// 找出所有的 属于 FormItem Props
	function FormItem(props: T & FormItemProps) {
		const formItemProps = GetValue(props, ...formItemPropsArray)
		const fieldProps = FilterValue(props, ...formItemPropsArray)

		return (
			<Form.Item {...formItemProps}>
				<Field {...fieldProps} />
			</Form.Item>
		)
	}
	return memo(withDefaultProps(FormItem, { mode: "edit", ...options }))
}

export default withFormItem
const formItemPropsArray = [
	"colon",
	"dependencies",
	"extra",
	"getValueFromEvent",
	"getValueProps",
	"hasFeedback",
	"help",
	"hidden",
	"htmlFor",
	"initialValue",
	"label",
	"labelAlign",
	"labelCol",
	"messageVariables",
	"name",
	"normalize",
	"noStyle",
	"preserve",
	"required",
	"rules",
	"shouldUpdate",
	"tooltip",
	"trigger",
	"validateFirst",
	"validateStatus",
	"validateTrigger",
	"valuePropName",
	"wrapperCol",
]
