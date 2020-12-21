import React, { useContext } from "react"
import { StepProps } from "antd/lib/steps"
import { BaseFormProps } from "../../type"
import BaseForm from "../BaseForm"
import { FormInstance } from "antd/lib/form"
import { StepsFormContext } from "."

interface StepsFormProps extends Omit<BaseFormProps, "onFinish"> {
	name: BaseFormProps["name"]
	stepProps?: StepProps
	onFinish?: (values: any, form?: FormInstance) => boolean | Promise<boolean>
}
// onFinish return true
// =>  next step
function StepForm(props: StepsFormProps) {
	const { stepProps, onFinish, ...rest } = props

	const handleNextStep = useContext(StepsFormContext)

	const handleOnFinish = async (values: any) => {
		if (typeof onFinish !== "function") return
		const result = await onFinish(values, rest.form)
		if (result === true) handleNextStep()
	}

	return <BaseForm {...rest} onFinish={handleOnFinish} />
}
StepForm.StepForm = true
export default StepForm

export type StepFormComponentType = React.ReactElement<
	BaseFormProps & {
		stepProps: StepProps
	},
	React.ComponentType<any> & { StepForm?: boolean }
>
