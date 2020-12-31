import React from "react"
import { Checkbox } from "antd"
import { CheckboxGroupProps } from "antd/lib/checkbox"
import withFormItem from "../../hocs/withFormItem"
import { BaseProFieldProps } from "../../ProField/type"

export interface ProFormCheckboxProps extends CheckboxGroupProps {
	render?: BaseProFieldProps<ProFormCheckboxProps>["render"]
	value?: CheckboxGroupProps["value"]
}

function ProFormCheckbox(props: ProFormCheckboxProps) {
	const { render, ...rest } = props
	const DOM = <Checkbox.Group {...rest} />
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<ProFormCheckboxProps>(ProFormCheckbox)
