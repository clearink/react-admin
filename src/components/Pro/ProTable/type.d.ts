import { FormInstance } from "antd/lib/form"
import { TitleTipProps } from "./../ProCard/components/TitleTip/index"
import { ColumnType, TableProps } from "antd/lib/table"
import { ComponentType, ReactNode } from "react"
import { FieldOptionType } from "../ProField/type"
import { QueryFilterProps } from "../ProForm/components/QueryFilter"
import { initialState, TableMethods } from "./useTableFetch"
import { UseMemoFetchProps } from "@/hooks/useMemoFetch"
import { CommonServerData } from "@/hooks/useMemoFetch/interface"

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
	| "tree-select"
	| "upload-list"

type FieldSelectProps = {
	/** 渲染方式  tag  badge */
	renderType?: "tag" | "badge"
	options?: FieldOptionType[] | string[]
	request?: UseMemoFetchProps
	statusList?: string[]
}

type BaseProFormChildrenProps = {
	placeholder?: string
}
export interface ProTableColumns<T extends object = any>
	extends Omit<ColumnType<T>, "render"> {
	tooltip?: string

	render?: (dom: ReactNode, value: any, record: any, index: number) => ReactNode // 扩展 table 原本的render函数

	hideInTable?: boolean // 在table中隐藏
	hideInForm?: boolean // 在form中隐藏
	hideInDetail?: boolean // 在详情页隐藏

	/** search 与 read 都需要的属性 */
	fieldProps?: FieldSelectProps
	/** 搜索属性 提取到 query filter 为true默认为ProFormInput */
	search?: JSX.Element | ComponentType<any>
	searchOrder?: number
	/** ProField的属性 为true 默认为ProFieldText */
	read?: JSX.Element | ComponentType<any>
}

export type ProTableRef = {
	reset: () => void // 重置 table
	reload: () => void // 重新加载数据
	clearRows: () => void // 清除选中
	setParams: (params: object) => void
	form: FormInstance
}
export interface ProTableRequest extends UseMemoFetchProps {
	transform: (
		data: CommonServerData
	) => { data: any; pageSize: number; current: number; total: number }
}

export interface ProTableProps<T extends object>
	extends Omit<
		TableProps<T>,
		"columns" | "rowSelection" | "title" | "pagination"
	> {
	/** 筛选form ref */
	formRef?: React.Ref<FormInstance>
	columns?: ProTableColumns<T>[]
	/** 搜索改变 */
	onSearch?: (values: any) => object
	/** 删除 */
	onDelete?: (
		values: string[] // 需要删除的数据
	) => void
	/** 新增 */
	onCreate?: () => void
	searchProps?: Partial<Omit<QueryFilterProps, "collapsed">>
	search: boolean | Partial<QueryFilterProps>
	request?: ProTableRequest
	title?: TitleTipProps["title"]
	/** 渲染右上角的action button */
	renderAction?: (dom: JSX.Element[]) => JSX.Element[]
	/** 渲染title */
	renderTitle?: (
		state: typeof initialState,
		methods: TableMethods,
		dom: JSX.Element[]
	) => JSX.Element
}
