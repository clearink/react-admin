import { ReactNode } from "react"

export type FieldType =
	| "avatar"
	| "text"
	| "money"
	| "percent"
	| "number"
	| "second"
	| "rate"
	| "select"
	| "checkbox"
	| "radio"
	| "radioButton"
	| "progress"
	| "date"
	| "dateTime"
	| "dateRange"
	| "dateTimeRange"
	| "fromNow"
	| "password"
	| "code"
	| "json"
export type ProFieldMode = "read" | "edit" | "update"
type ProFieldEnumType = {
	/**
	 * @name 演示的文案
	 */
	text: ReactNode

	/**
	 * @name 预定的颜色
	 */
	status?: "success" | "processing" | "error" | "default" | "warning"
	/**
	 * @name 自定义的颜色
	 */
	color?: string
	/**
	 * @name 是否禁用
	 */
	disabled?: boolean
}
export type ProFieldEnum = { [key: string]: ProFieldEnumType }
export type BaseFieldProps = {
	text: ReactNode
	mode: ProFieldMode
	plain?: boolean
	light?: boolean
	fieldEnum?: ProFieldEnum
}
export type BaseFieldRenderProps = {
	render?: (
		text: any,
		props: Omit<BaseFieldProps, "text">,
		dom: JSX.Element
	) => JSX.Element
	renderFormItem?: (
		text: any,
		props: Omit<BaseFieldProps, "text">,
		dom: JSX.Element
	) => JSX.Element
}

export type ProFieldRequestData = (
	params: any,
	props: any
) => Promise<
	{
		label: React.ReactNode
		value: React.ReactText
	}[]
>

export type FieldObjectType = {
	type:
		| "percent"
		| "money"
		| "date"
		| "dateTime"
		| "dateRange"
		| "dateTimeRange"
	status?: "normal" | "active" | "success" | "exception"

	// percent 独有
	hasSymbol?: boolean
	hasColor?: boolean
	// date 独有
	timeFormate?: string
	// password
	hiddenMark?: string

	precision?: number

	request?: ProFieldRequestData
}

export type ProFieldType = FieldObjectType | FieldType

type RenderProps = Omit<BaseFieldProps, "text"> &
	BaseFieldRenderProps & {
		emptyText?: ReactNode
		visible?: boolean
		onVisible?: (visible: boolean) => void
		[key: string]: any
	}

export type ProFieldProps = BaseFieldProps &
	BaseFieldRenderProps & {
		fieldProps: Object
		timeFormat?: string
	}
