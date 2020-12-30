type FieldMode = "read" | "edit" | "update" | "plain"
export interface BaseFieldRenderProps {
	render?: (value: any, props: {}, dom: React.ReactNode) => JSX.Element
	/** value 可以不要吧 */
	renderFormItem?: (value: any, props: {}, dom: React.ReactNode) => JSX.Element
}

export type FieldOptionType = { label: string; value: any }

export interface BaseProFieldProps extends BaseFieldRenderProps {
	/** mode = read 时的文本属性 */
	text?: any
	/** 模式 默认是 read */
	mode?: FieldMode
}
export interface BaseFieldSelectProps {
	/**  color array */
	fieldEnum?: string[]
	/** 转换数据格式  不属于数据请求的范畴  */
	transform?: (data?: any) => any
}
