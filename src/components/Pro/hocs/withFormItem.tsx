import FilterValue from "@/utils/FilterValue"
import GetValue from "@/utils/GetValue"
import { Form } from "antd"
import { FormItemProps } from "antd/lib/form"
import React, { ComponentType } from "react"
import { BaseProFieldProps } from "../ProField/type"
import { antdFormItemProps } from "../utils/constant"
import withProField from "./withProField"
// 将各种 ProField 包装一下
// TODO : SizeContext 用于设置组件的大小
interface FieldStyleProps {
	style?: React.CSSProperties
	className?: string
}

export interface BaseFormItemProps<T = {}> {
	/** Field = 'read' 的属性 */
	fieldProps?: T & FieldStyleProps
	/** 预设的宽度 */
	width?: number | "s" | "sm" | "m" | "md" | "l" | "lg" | "xl"
	/** 切换模式 默认=edit */
	read?: boolean
	formItemClassName?: string
	formItemStyle?: React.CSSProperties
}
function withFormItem<T extends BaseFormItemProps>(
	Field: ComponentType<T>,
	options?: Partial<T>
) {
	// 找出所有的 属于 FormItem Props
	function FormItem(props: T & FormItemProps) {
		const formItemProps = GetValue(props, antdFormItemProps, false)
		const editProps = FilterValue(props, antdFormItemProps)
		const { fieldProps } = props
		return (
			<Form.Item {...formItemProps}>
				<Field {...fieldProps} formItemProps={editProps} />
			</Form.Item>
		)
	}
	return withProField(FormItem, { ...options } as any)
}

export default withFormItem
