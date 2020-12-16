import { ButtonProps } from "antd/lib/button"
import { FormInstance, FormItemProps, FormProps } from "antd/lib/form"
import { Store } from "antd/lib/form/interface"
import { ReactNode } from "react"

export type SubmitConfigType<T = {}> = {
	onSubmit?: () => void
	onReset?: () => void
	render?: (
		props: SubmitConfigType & T,
		dom: JSX.Element[]
	) => ReactNode[] | ReactNode
}

export interface CommonFormProps {
	submitConfig?: {
		submitButtonProps?: ButtonProps & {
			text?: ReactNode
		}
		resetButtonProps?: ButtonProps & {
			text?: ReactNode
		}
		render?: SubmitConfigType["render"]
	}
	onFinish?: (values: Store) => Promise<boolean | void>
}
export interface BaseFormProps extends FormProps, CommonFormProps {
	fieldProps?: any
	form?: FormInstance
}
