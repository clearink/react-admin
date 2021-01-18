import React, { ComponentType } from "react"
import { ColumnType } from "antd/lib/table"
import { FieldSelectProps } from "@/components/Pro/ProTable/type"

export interface TableFormProps<T = any>
	extends Omit<TableProps<T>, "columns" | "onChange" | "dataSource"> {
	rowKey?: string
	columns?: TableFormColumns<T>[]
	addType?: AddFormProps["type"]
	editType?: EditFormProps["type"]
	onChange?: (newList: Array<T>) => void
	value?: Array<T>
}
export interface TableFormColumns<T = any>
	extends Omit<ColumnType<T>, "render"> {
	read?: JSX.Element | ComponentType<T>
	edit?: JSX.Element | ComponentType<T>
	hideInTable?: boolean
	tooltip?: string
	fieldProps?: FieldSelectProps
	render?: (
		dom: JSX.Element,
		text: any,
		record: T,
		index: number,
		action: TableFormRef<T>
	) => React.ReactNode
}

export interface TableFormRef<T extends object = any> {
	add: () => void
	edit: (record: T) => void
	delete: (record: T) => void
}
