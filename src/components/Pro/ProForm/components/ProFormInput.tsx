import React from "react"
import { Input } from "antd"
import { InputProps } from "antd/lib/input"
import withFormItem from "../../hocs/withFormItem"
import { BaseProFieldProps } from "../../ProField/type"

export interface ProFormInputProps extends InputProps {
	render?: BaseProFieldProps<ProFormInputProps>["render"]
	value?: InputProps["value"]
}
function ProFormInput(props: ProFormInputProps) {
	const { render, ...rest } = props
	const DOM = <Input {...rest} />
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<ProFormInputProps>(ProFormInput, {
	allowClear: true,
	placeholder: "请输入",
})
