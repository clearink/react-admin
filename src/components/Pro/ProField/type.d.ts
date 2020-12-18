type FieldMode = "read" | "edit" | "update" | "plain"
export interface BaseFieldRenderProps {
	render?: (value: any, props: {}, dom: React.ReactNode) => JSX.Element
	renderFormItem?: <T>(
		value: any,
		props: T & {},
		dom: React.ReactNode
	) => JSX.Element
}

export interface FieldEnumProps {
	status?: "success" | "processing" | "error" | "default" | "warning"
	color?: string
}
export type FieldOptionType = { label: string; value: any }
export interface BaseProFieldProps extends BaseFieldRenderProps {
	text?: any
	mode: FieldMode // 模式
	fieldEnum?: FieldEnumProps[] // 默认 enum
	fetchUrl?: string | { url: string; params?: object } // 请求 enum 的 url
	transform?: (originOptions?: any, fieldEnum?: any) => any[] // 转换options
}
