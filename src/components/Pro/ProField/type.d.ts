type FieldMode = "read" | "edit" | "update" | "plain"
export interface BaseFieldRenderProps {
	render?: (value: any, props: {}, dom: React.ReactNode) => JSX.Element
	renderFormItem?: <T>(
		value: any,
		props: T & {},
		dom: React.ReactNode
	) => JSX.Element
}

export type FieldOptionType = { label: string; value: any }

export interface RequestProps {
	fetch?: boolean
	fieldEnum?: string[]
	fetchUrl?: string | { url: string; params?: object } // 请求 enum 的 url
	fetchMethod?: "get" | "post" // 有些不规范的不使用 get 请求数据
	transform?: (originOptions?: any, fieldEnum?: any) => any[] // 转换数据格式
}
export interface BaseProFieldProps extends BaseFieldRenderProps, RequestProps {
	text?: any
	mode: FieldMode // 模式
}
