import Input, { InputProps } from "antd/lib/input"
import React from "react"
import { FC } from "react"
import withFormItem from "../../hocs/withFormItem"
import { BaseProFieldProps } from "../../ProField/type"

export interface ProFormTextProps extends InputProps {
	render?: BaseProFieldProps<ProFormTextProps>["render"]
}

const ProFormText: FC<ProFormTextProps> = (props) => {
	const { render, ...rest } = props
	const DOM = <Input {...rest} />
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<InputProps, ProFormTextProps>(ProFormText)
