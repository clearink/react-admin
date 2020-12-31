import withDefaultProps from "@/hocs/withDefaultProps"
import FilterValue from "@/utils/FilterValue"
import GetValue from "@/utils/GetValue"
import { isNumber } from "@/utils/validate"
import { Form } from "antd"
import { FormItemProps } from "antd/lib/form"
import React, { memo } from "react"
import { antdFormItemProps, WIDTH_SIZE_ENUM } from "../utils/constant"
// 将各种 ProField 包装一下
// TODO : SizeContext 用于设置组件的大小
interface FieldStyleProps {
	style?: React.CSSProperties
	className?: string
}
export interface BaseProFormProps extends FormItemProps {
	width?: number | "xs" | "s" | "m" | "l" | "lg" | "xl"
	formItemClassName?: string
	formItemStyle?: React.CSSProperties
}
function withFormItem<P extends FieldStyleProps>(
	Field: React.ComponentType<P>,
	defaultProps?: Partial<P>
) {
	function FormItem(props: P & BaseProFormProps) {
		const { width, formItemClassName, formItemStyle, ...rest } = props

		// 找出所有的 属于 FormItem Props
		const formItemProps = GetValue(rest, antdFormItemProps, false)
		const fieldProps = FilterValue(rest, antdFormItemProps) as P

		/** 计算width */
		fieldProps.style = { width: "100%", ...fieldProps.style }
		// 计算 formItem 的宽度
		let FORM_ITEM_STYLE = { ...formItemStyle }
		if (width) {
			if (isNumber(width)) FORM_ITEM_STYLE = { width, ...FORM_ITEM_STYLE }
			FORM_ITEM_STYLE = {
				width: WIDTH_SIZE_ENUM[width] ?? WIDTH_SIZE_ENUM["m"],
				...FORM_ITEM_STYLE,
			}
		}

		/** 解决 Field 报错的问题 */
		return (
			<Form.Item
				{...formItemProps}
				className={formItemClassName}
				style={FORM_ITEM_STYLE}
			>
				<Field {...fieldProps} />
			</Form.Item>
		)
	}
	return memo(
		withDefaultProps<Omit<P, keyof FormItemProps> & BaseProFormProps>(
			FormItem as any,
			{
				...defaultProps,
			}
		)
	)
}

export default withFormItem
