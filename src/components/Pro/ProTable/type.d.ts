import { TitleTipProps } from "./../ProCard/components/TitleTip/index"
import { TextProps } from "antd/lib/typography/Text"
import { FormItemProps } from "antd/lib/form"
import { ColumnType, TableProps } from "antd/lib/table"
import { ReactNode } from "react"
import { BaseProFieldProps, FieldOptionType } from "../ProField/type"
import { QueryFilterProps } from "../ProForm/components/QueryFilter"
import { initialState, TableMethods } from "./useTableFetch"
import { useFetchDataProps } from "@/hooks/useMemoFetch"

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
	| "option"
export interface ProTableColumns<T extends object = any>
	extends Omit<ColumnType<T>, "render"> {
	field?: ProFieldType | "option"
	tooltip?: string
	search?: boolean // 提取到 query filter
	hideInTable?: boolean // 在table中隐藏
	hideInForm?:boolean // 在form中隐藏
	hideInDetail?:boolean // 在详情页隐藏
	render?: (
		value: any,
		record: any,
		index: number,
		action: ProTableRef
	) => ReactNode // 扩展 table 原本的render函数

	/** 注意 ellipsis 必须搭配 width  使用 */
	fieldProps?: FormItemProps &
		BaseProFieldProps &
		TextProps & {
			// Field Select checkbox radio
			showTag?: boolean
			options?: FieldOptionType[] | string[]
			request?: useFetchDataProps
			placeholder?: ReactNode
			statusList?: string[]
		}
}

export type ProTableRef = {
	reset: () => void // 重置 table
	reload: () => void // 重新加载数据
	clearRows: () => void // 清除选中
	setParams: (params: object) => void
}
export interface ProTableProps<T extends object>
	extends Omit<
		TableProps<T>,
		"columns" | "rowSelection" | "title" | "pagination"
	> {
	columns?: ProTableColumns<T>[]
	/** 搜索改变 */
	onSearch?: (values: any) => object
	onDelete?: (
		values: string[] // 需要删除的数据
	) => void
	searchProps?: Partial<Omit<QueryFilterProps, "collapsed">>
	search: boolean
	request?: useFetchDataProps
	title?: TitleTipProps["title"]
	/** 渲染title */
	renderTitle?: (
		state: typeof initialState,
		methods: TableMethods,
		dom: JSX.Element[]
	) => JSX.Element
	/** 转换数据 */
	transform?: (
		OD: any
	) => {
		data: any[]
		current: number
		pageSize: number
		total: number
	}
}
