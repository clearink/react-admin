import withDefaultProps from "@/hocs/withDefaultProps"
import FilterValue from "@/utils/FilterValue"
import GetValue from "@/utils/GetValue"
import { Form } from "antd"
import { FormItemProps } from "antd/lib/form"
import React, { ComponentType, memo } from "react"
import { BaseProFieldProps } from "../ProField/type"
import { antdFormItemProps } from "../utils/constant"
// 将各种 ProField 包装一下
function withFormItem<T extends BaseProFieldProps>(
	Field: ComponentType<T>,
	options?: Partial<T>
) {
	// 找出所有的 属于 FormItem Props
	function FormItem(props: T & FormItemProps) {
		const formItemProps = GetValue(props, antdFormItemProps)
		const fieldProps = FilterValue(props, antdFormItemProps)
		return (
			<Form.Item {...formItemProps}>
				<Field {...(fieldProps as T)} />
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
