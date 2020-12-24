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
	fetch?: boolean // 是否需要请求
	url?: string | { url: string; params?: object } // 请求 地址
	method?: "get" | "post" // 有些不规范的不使用 get 方法请求
	/** 转换数据格式  直接转换算了  */
	transform?: (data?: any) => any
	cache?: boolean // 是否需要缓存到 kv store
}
export interface BaseProFieldProps extends BaseFieldRenderProps {
	text?: any
	mode: FieldMode // 模式
	fieldEnum?: string[] // tag badge的 color
}
