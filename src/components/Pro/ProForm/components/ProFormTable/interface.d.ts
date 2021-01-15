import React, { ComponentType } from "react"
import { ColumnType } from "antd/lib/table"
import { FieldSelectProps } from "@/components/Pro/ProTable/type"
export interface TableFormColumns<T extends object = any>
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
		index: number
	) => React.ReactNode
}
