import { ReactNode } from "react"
import { ButtonProps } from "antd/lib/button"
import { FormItemProps, FormProps } from "antd/lib/form"

export type SubmitConfigType = {
	submitProps?: ButtonProps & { text?: ReactNode }
	resetProps?: ButtonProps & { text?: ReactNode }
	onReset?: () => void
	onSubmit?: () => void
	render?: (dom: JSX.Element[], form: FormInstance, props: any) => ReactNode
}
export interface BaseFormProps extends FormProps {
	submitConfig?: SubmitConfigType | false
	loading?: ButtonProps["loading"]
}

interface FieldStyleProps {
	style?: React.CSSProperties
	className?: string
}

// 表单组件基本的属性  是否要继承 BaseFieldProps ?
// fieldProps 是直接传递给 formItemProps的
// 会再继承一个ProFormItem 属性 通过 withFormItem 传递给 Field
export interface BaseFormItemProps<T = {}> extends FormItemProps {
	/** Field = 'read' 的属性 */
	fieldProps?: T & FieldStyleProps
	/** 预设的宽度 */
	width?: number | "s" | "sm" | "m" | "md" | "l" | "lg" | "xl"
	/** 切换模式 默认=edit */
	read?: boolean
}
