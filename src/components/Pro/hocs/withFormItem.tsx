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
