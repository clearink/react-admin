import withDefaultProps from "@/hocs/withDefaultProps"
import FilterValue from "@/utils/FilterValue"
import GetValue from "@/utils/GetValue"
import { isNumber, isUndefined } from "@/utils/validate"
import { Form } from "antd"
import { FormItemProps } from "antd/lib/form"
import React, { ComponentType, memo, useMemo } from "react"
import { BaseProFieldProps } from "../ProField/type"
// 将各种 ProField 包装一下
// TODO : SizeContext 用于设置组件的大小
export type ProFormItemProps<T extends BaseProFieldProps> = T &
	FormItemProps & {
		formItemClassName?: string
		formItemStyle?: React.CSSProperties
		// 																104     216   328   440   552
		fieldWidth?: number | "xs" | "s" | "m" | "l" | "x" | "lg" // 设置给formItem 的宽度
	}
const sizeObject = {
	xs: 104,
	s: 216,
	m: 328,
	l: 440,
	x: 552,
	lg: 668,
}
const sizeArray = Object.keys(sizeObject)
function withFormItem<T extends BaseProFieldProps>(
	Field: ComponentType<T>,
	options?: Partial<T>
) {
	// 找出所有的 属于 FormItem Props
	function FormItem(props: ProFormItemProps<T>) {
		const { fieldWidth } = props
		const formItemProps = GetValue(props, ...formItemPropsArray)
		// 新增 设置 formItemProps 属性
		const fieldProps = FilterValue(
			props,
			...formItemPropsArray,
			"formItemClassName",
			"formItemStyle", // 可以给 formItem 设置 样式
			"fieldWidth"
		)
		const FWidth = useMemo(() => {
			if (isUndefined(fieldWidth) || isNumber(fieldWidth)) return fieldWidth
			if (sizeArray.includes(fieldWidth)) return sizeObject[fieldWidth]
			return fieldWidth
		}, [fieldWidth])
		console.log("fieldProps", fieldProps)
		return (
			<Form.Item
				{...formItemProps}
				className={props.formItemClassName}
				style={props.formItemStyle}
			>
				<Field
					{...fieldProps}
					style={{
						...fieldProps.style,
						width: FWidth ?? fieldProps.style?.width,
					}}
				/>
			</Form.Item>
		)
	}
	return memo(
		withDefaultProps(FormItem, {
			mode: "edit",
			style: { width: "100%" },
			...(options ?? {}),
		})
	)
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
