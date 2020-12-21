import React, { useContext } from "react"
import { StepProps } from "antd/lib/steps"
import { BaseFormProps } from "../../type"
import BaseForm from "../BaseForm"
import { FormInstance } from "antd/lib/form"
import { StepsFormContext } from "."
import { isUndefined } from "@/utils/validate"

interface StepsFormProps extends Omit<BaseFormProps, "onFinish"> {
	stepProps?: StepProps
	onFinish?: (values: any, form?: FormInstance) => boolean | Promise<boolean>
}
// onFinish return true
// =>  next step
function StepForm(props: StepsFormProps) {
	const { stepProps, onFinish, ...rest } = props

	const contextValue = useContext(StepsFormContext)

	const handleOnFinish = async (values: any) => {
		if (typeof onFinish !== "function") return
		const result = await onFinish(values, rest.form)
		if (result === true && !isUndefined(contextValue)) {
			console.log("next step", values)
			contextValue.setCurrent((p) => p + 1)
		}
	}

	return (
		<BaseForm
			{...rest}
			onFinish={handleOnFinish}
			submitConfig={{
				render: (dom) => dom.pop(),
				...rest.submitConfig,
			}}
		/>
	)
}
StepForm.StepForm = true
export default StepForm
