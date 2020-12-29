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

export interface BaseProFieldProps extends BaseFieldRenderProps {
	text?: any
	/** 模式 */
	mode: FieldMode 
	fieldEnum?: string[] // tag badge的 color
	/** 转换数据格式  不属于数据请求的范畴  */
	transform?: (data?: any) => any
}
