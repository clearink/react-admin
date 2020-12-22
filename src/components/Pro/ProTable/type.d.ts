import { FormItemProps } from "antd/lib/form"
import { ColumnType } from "antd/lib/table"
import { ReactNode } from "react"
import { BaseProFieldProps } from "../ProField/type"

// pro table column 类型
export type ProFieldType =
	| "checkbox"
	| "code"
	| "date"
	| "time"
	| "dateRange"
	| "dateTime"
	| "dateTimeRange"
	| "fromNow"
	| "password"
	| "percent"
	| "radio"
	| "select"
	| "avatar"
	| "digit" //数字
	| "json"
	| "money"
	| "progress"
	| "rate"
	| "text"
	| "orderNum"
export interface ProTableColumns<T extends object = any> extends ColumnType<T> {
	field?: ProFieldType
	tooltip?: ReactNode
	search?: boolean // 提取到 query filter
	fieldProps?: FormItemProps & Partial<BaseProFieldProps>
}
