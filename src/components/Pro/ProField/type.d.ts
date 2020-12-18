import { BadgeProps } from "antd/lib/badge"
import { TagProps } from "antd/lib/tag"

type FieldMode = "read" | "edit" | "update" | "plain"
export interface BaseFieldRenderProps {
	render?: (value: any, props: {}, dom: React.ReactNode) => JSX.Element
	renderFormItem?: (value: any, props: {}, dom: React.ReactNode) => JSX.Element
}

export interface FieldEnumProps {
	text?: string | number
	status?: "success" | "processing" | "error" | "default" | "warning"
	color?: string
	badge?: boolean // 选用 Badge 渲染 文本
}
export interface BaseProFieldProps extends BaseFieldRenderProps {
	text?: any
	mode: FieldMode // 模式
	fieldEnum?: FieldEnumProps[] // 默认 enum
	fetchUrl?: string | { url: string; params?: object } // 请求 enum 的 url
	transform?: (originOptions?: any, fieldEnum?: any) => any[] // 转换options
}
