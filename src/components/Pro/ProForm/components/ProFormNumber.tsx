import React from "react"
import { InputNumber } from "antd"
import { InputNumberProps } from "antd/lib/input-number"
import withFormItem from "../../hocs/withFormItem"

export interface ProFormNumberProps extends InputNumberProps {
	render?: (
		props: Omit<ProFormNumberProps, "render">,
		dom: JSX.Element
	) => JSX.Element
	value?: InputNumberProps["value"]
}
function ProFormNumber(props: ProFormNumberProps) {
	const { render, ...rest } = props
	const DOM = <InputNumber {...rest} />
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<ProFormNumberProps>(ProFormNumber)
