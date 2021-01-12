import React from "react"
import { Input } from "antd"
import { InputProps, TextAreaProps } from "antd/lib/input"
import withFormItem from "../../hocs/withFormItem"
import { BaseProFieldProps } from "../../ProField/type"

export interface ProFormTextAreaProps extends TextAreaProps {
	render?: BaseProFieldProps<ProFormTextAreaProps>["render"]
	value?: InputProps["value"]
}
function ProFormTextArea(props: ProFormTextAreaProps) {
	const { render, ...rest } = props
	const DOM = <Input.TextArea {...rest} />
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<ProFormTextAreaProps>(ProFormTextArea, {
	allowClear: true,
	placeholder: "请输入",
})
