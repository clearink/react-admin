import React, { memo, useMemo, useState } from "react"
import { Table } from "antd"
import classNames from "classnames"
import { TableProps } from "antd/lib/table"
import { ProTableColumns } from "./type"
import { QueryFilter } from "../ProForm/components"
import styles from "./style.module.scss"
import renderQueryFilter from "../utils/renderQueryFilter"
import { nanoid } from "@reduxjs/toolkit"
import { ButtonProps } from "antd/lib/button"
import { QueryFilterProps } from "../ProForm/components/QueryFilter"
import withDefaultProps from "@/hocs/withDefaultProps"

// TODO queryFilter props

export interface ProTableProps<T extends object>
	extends Omit<TableProps<T>, "columns"> {
	columns?: ProTableColumns<T>[]
	onSearch?: (values: any) => any
	searchProps?: Partial<Omit<QueryFilterProps, "collapsed">>
	search: boolean
}
function ProTable<T extends object>(props: ProTableProps<T>) {
	const { columns: propsColumns, onSearch, search, ...rest } = props
	// 提取 query filter
	const [columns, QFArray] = useMemo(() => {
		const QFArray: any[] = []
		if (!propsColumns) return [[], []]
		for (let i = 0; i < propsColumns?.length; i += 1) {
			const element = propsColumns[i]
			if (element.field && element.search) {
				QFArray.push([
					element.field,
					{
						key: nanoid(8),
						label: element.title,
						name: element.dataIndex,
						...element.fieldProps,
					},
				])
			}
		}
		return [propsColumns, QFArray]
	}, [propsColumns])

	const [tableLoading, setTableLoading] = useState<ButtonProps["loading"]>(
		false
	) // table loading 效果

	const handleSearch = async (values: any) => {
		setTableLoading({ delay: 100 })
		await onSearch?.(values)
		setTableLoading(false)
	}
	return (
		<div className={styles.pro_table_wrap}>
			{search && (
				<div
					className={classNames(styles.table_search_bar, {
						[styles.ghost]: false,
					})}
				>
					<QueryFilter onFinish={handleSearch}>
						{renderQueryFilter(QFArray)}
					</QueryFilter>
				</div>
			)}
			<Table {...rest} loading={tableLoading} columns={columns} />
		</div>
	)
}
export default memo(
	withDefaultProps(ProTable, {
		search: true,
	})
)
