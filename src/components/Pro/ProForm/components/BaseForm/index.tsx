import React, { createContext, memo } from "react"
import { Form } from "antd"
import { BaseFormProps } from "./type"
import withDefaultProps from "@/hocs/withDefaultProps"
import Submitter from "@/components/Pro/utils/Submitter"
import { FormItemProps } from "antd/lib/form"

export const FormContext = createContext<{
	fieldProps?: Object
	formItemProps?: FormItemProps
}>({})

// 基础的Form 用于各种变种的pro form
function BaseForm(props: BaseFormProps) {
	const { children, form: propsForm, submitConfig, ...rest } = props
	const [form] = Form.useForm(propsForm)
	return (
		<Form
			{...rest}
			form={form}
			onKeyPress={(e) => {
				if (e.key === "Enter") form.submit()
			}}
		>
			{children}
			<Submitter form={form} {...submitConfig} />
		</Form>
	)
}
export default memo(withDefaultProps(BaseForm, {}))
