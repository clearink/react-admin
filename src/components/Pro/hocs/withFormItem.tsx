import withDefaultProps from "@/hocs/withDefaultProps"
import FilterValue from "@/utils/FilterValue"
import GetValue from "@/utils/GetValue"
import { Form } from "antd"
import { FormItemProps } from "antd/lib/form"
import React, { ComponentType, memo } from "react"
import { BaseProFieldProps } from "../ProField/type"
import { antdFormItemProps } from "../utils/constant"
import withProField from "./withProField"
// 将各种 ProField 包装一下
// TODO : SizeContext 用于设置组件的大小
export interface ProFormItemProps extends FormItemProps {
	formItemClassName?: string
	formItemStyle?: React.CSSProperties
	// 																104     216   328   440   552
	fieldWidth?: number | "xs" | "s" | "m" | "l" | "x" | "lg" // 设置给formItem 的宽度
	formItemProps?: object
}
function withFormItem<T extends BaseProFieldProps>(
	Field: ComponentType<T>,
	options?: Partial<T>
) {
	// 找出所有的 属于 FormItem Props
	function FormItem(props: T & ProFormItemProps) {
		const formItemProps = GetValue(props, antdFormItemProps)
		// 新增 设置 formItemProps 属性
		const fieldProps = FilterValue(props, [
			...antdFormItemProps,
			"formItemClassName",
			"formItemStyle",
			"fieldWidth",
		])
		// const FWidth = useMemo(() => {
		// 	if (isUndefined(fieldWidth) || isNumber(fieldWidth)) return fieldWidth
		// 	if (sizeArray.includes(fieldWidth)) return sizeObject[fieldWidth]
		// 	return fieldWidth
		// }, [fieldWidth])

		return (
			<Form.Item
				{...formItemProps}
				className={props.formItemClassName}
				style={props.formItemStyle}
			>
				<Field {...fieldProps} formItemProps={fieldProps} />
			</Form.Item>
		)
	}
	return withProField(FormItem, { ...options })
}

export default withFormItem
