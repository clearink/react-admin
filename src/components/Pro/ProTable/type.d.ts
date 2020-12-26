import { TextProps } from "antd/lib/typography/Text"
import { FormItemProps } from "antd/lib/form"
import { ColumnType, TableProps } from "antd/lib/table"
import { ReactNode } from "react"
import {
	BaseProFieldProps,
	FieldOptionType,
	RequestProps,
} from "../ProField/type"
import { AnyAction } from "@reduxjs/toolkit"
import { QueryFilterProps } from "../ProForm/components/QueryFilter"
import { actions, initialState } from "./reducer"

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
export interface ProTableColumns<T extends object = any>
	extends Omit<ColumnType<T>, "render"> {
	field?: ProFieldType | "option"
	tooltip?: string
	search?: boolean // 提取到 query filter
	hideInTable?: boolean // 在table中隐藏
	render?: (
		value: any,
		record: any,
		index: number,
		action: ProTableRef
	) => ReactNode // 扩展 table 原本的render函数

	/** 注意 ellipsis 必须搭配 width  使用 */
	fieldProps?: FormItemProps &
		Partial<BaseProFieldProps> &
		TextProps & {
			// Field Select checkbox radio
			showTag?: boolean
			options?: FieldOptionType[] | string[]
			request?: RequestProps
		}
}

export type ProTableRef = {
	reset: () => void // 重置 table
	reload: () => void // 重新加载数据
	clearSelected: () => void // 清除选中
}

export interface ProTableProps<T extends object>
	extends Omit<
		TableProps<T>,
		"columns" | "rowSelection" | "title" | "pagination"
	> {
	columns?: ProTableColumns<T>[]
	onSearch?: (
		values: any,
		dispatch: React.Dispatch<AnyAction>,
		Actions: typeof actions
	) => any
	searchProps?: Partial<Omit<QueryFilterProps, "collapsed">>
	search: boolean
	request?: RequestProps
	title?: string | { title: string; tooltip: string }
	/** 渲染title */
	renderTitle?: (
		state: typeof initialState,
		dispatch: React.Dispatch<AnyAction>,
		Actions: typeof actions
	) => JSX.Element
	/** 转换数据 */
	transform?: (
		OD: any,
		dispatch: React.Dispatch<AnyAction>,
		Actions: typeof actions
	) => any
}
