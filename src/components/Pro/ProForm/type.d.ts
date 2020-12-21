import { ButtonProps } from "antd/lib/button"
import { FormProps } from "antd/lib/form"
import { ReactNode } from "react"

export type SubmitConfigType = {
	submitProps?: ButtonProps & { text?: ReactNode }
	resetProps?: ButtonProps & { text?: ReactNode }
	onReset?: () => void
	onSubmit?: () => void
	render?: (
		dom: JSX.Element[],
		props: Omit<SubmitConfigType, "render">
	) => ReactNode
}
export interface BaseFormProps extends FormProps {
	submitConfig?: SubmitConfigType
}
