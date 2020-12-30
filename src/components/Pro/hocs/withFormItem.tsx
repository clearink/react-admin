import FilterValue from "@/utils/FilterValue"
import GetValue from "@/utils/GetValue"
import { Form } from "antd"
import { FormItemProps } from "antd/lib/form"
import React from "react"
import { BaseProFieldProps } from "../ProField/type"
import { antdFormItemProps } from "../utils/constant"
import withProField from "./withProField"
// 将各种 ProField 包装一下
// TODO : SizeContext 用于设置组件的大小
interface FieldStyleProps {
	style?: React.CSSProperties
	className?: string
}

/** ProForm基本的一些字段 */
export interface BaseFormItemProps<F = {}>
	extends FormItemProps,
		BaseProFieldProps {
	/** Field = 'read' 的属性 */
	fieldProps?: F & FieldStyleProps
	/** 预设的宽度 */
	width?: number | "s" | "sm" | "m" | "md" | "l" | "lg" | "xl"
	/** 切换模式 默认=edit */
	/** 给 Form.Item 的样式 可以考虑去除 */
	formItemClassName?: string
	formItemStyle?: React.CSSProperties
	/** 渲染 表单控件 */
	renderFormItem?: (value: any, props: {}, dom: React.ReactNode) => JSX.Element
}

/** 传入的
 * p 是 ProFormItem 想要的数据
 * f 是 fieldProps 的数据
 * */
function withFormItem<P = {}, F = {}>(
	Field:
		| React.ComponentType<P>
		| React.ForwardRefExoticComponent<P>
		| React.MemoExoticComponent<any>,
	defaultEditProps?: Partial<F>
) {
	const WrapperField = (props: any) => {
		const { valuePropName, formItemProps, onChange, id, ...rest } = props
		const valueName = valuePropName ?? "value"
		const editProps = {
			...formItemProps,
			[valueName]: props[valueName],
			onChange,
			id,
		}
		const otherProps = {
			...FilterValue(rest, [valueName]),
		} as any
		return <Field {...otherProps} formItemProps={editProps} />
	}
	
	function FormItem(props: P & BaseFormItemProps<F>) {
		const {
			fieldProps,
			width,
			text,
			mode,
			formItemClassName,
			formItemStyle,
			renderFormItem,
			...rest
		} = props

		// 找出所有的 属于 FormItem Props
		const formItemProps = GetValue(rest, antdFormItemProps, false)

		// 找出应当是restProps 的属性
		/** antd form control props
		 * value: undefined, id: "3221", onChange: ƒ
		 */
		const editProps = {
			...FilterValue(rest, antdFormItemProps),
			...defaultEditProps,
			style: { width: "100%" },
		}
		/** 计算width */
		if (width) {
		}

		/** 解决 Field 报错的问题 */
		const restProps = ({ mode } as any) as P
		return (
			<Form.Item {...formItemProps}>
				<WrapperField
					{...restProps}
					{...fieldProps}
					formItemProps={editProps}
					renderFormItem={renderFormItem}
					valuePropName={formItemProps.valuePropName}
				/>
			</Form.Item>
		)
	}

	return withProField(FormItem, { mode: "edit" })
}

export default withFormItem
