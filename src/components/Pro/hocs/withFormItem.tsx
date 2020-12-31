import withDefaultProps from "@/hocs/withDefaultProps"
import FilterValue from "@/utils/FilterValue"
import GetValue from "@/utils/GetValue"
import { Form } from "antd"
import { FormItemProps } from "antd/lib/form"
import React, { memo } from "react"
import { antdFormItemProps } from "../utils/constant"
// 将各种 ProField 包装一下
// TODO : SizeContext 用于设置组件的大小
interface FieldStyleProps {
	style?: React.CSSProperties
	className?: string
}
export interface BaseProFormProps extends FormItemProps {
	width?: number | "s" | "sm" | "m" | "md" | "l" | "lg" | "xl"
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
		// 重新计算宽度
		if (width) {
		}

		/** 解决 Field 报错的问题 */
		return (
			<Form.Item {...formItemProps}>
				<Field {...fieldProps} />
			</Form.Item>
		)
	}
	return memo(withDefaultProps(FormItem, { ...defaultProps }))
}

export default withFormItem
