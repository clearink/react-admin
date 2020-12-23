import { FormItemProps } from "antd/lib/form"
import { ColumnType } from "antd/lib/table"
import { ReactNode } from "react"
import { BaseProFieldProps, FieldOptionType } from "../ProField/type"

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
	tooltip?: string
	search?: boolean // 提取到 query filter
	hideInTable?: boolean // 在table中隐藏
	fieldProps?: FormItemProps &
		Partial<BaseProFieldProps> & {
			// Field Select checkbox radio
			textTag?: boolean
			options?: FieldOptionType[]
		}
}
