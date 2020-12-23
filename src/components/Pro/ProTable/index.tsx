import React, {
	memo,
	useLayoutEffect,
	useMemo,
	useState,
} from "react"
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
import { TitleTip } from "../ProCard/components"
import { ProFieldMap } from "../ProField"

// TODO queryFilter props
/**
 * search 属性 在 query filter中显示
 *
 * Q1: 文本 or status 如何显示在 table 中呢
 * 更加 pro components 来看 是根据 field 字段决定 render时所用的组件
 *	Q2 propsLoading 如何在外部控制 query filter (base form) submitter 的 loading?
 */

export interface ProTableProps<T extends object>
	extends Omit<TableProps<T>, "columns"> {
	columns?: ProTableColumns<T>[]
	onSearch?: (values: any) => any
	searchProps?: Partial<Omit<QueryFilterProps, "collapsed">>
	search: boolean
}

function ProTable<T extends object>(props: ProTableProps<T>) {
	const {
		columns: propsColumns,
		onSearch,
		search,
		rowSelection: propsRowSelection,
		loading: propsLoading,
		...rest
	} = props
	// 提取 query filter
	const [columns, QFArray] = useMemo(() => {
		const QFArray: any[] = []
		if (!propsColumns) return [[], []]
		const columns = []
		for (let i = 0; i < propsColumns?.length; i += 1) {
			const element = propsColumns[i]
			// 处理query filter
			if (element.search) {
				QFArray.push([
					element.field,
					{
						key: nanoid(8),
						label: element.title, // 默认是 title 也可以自行传入
						name: element.dataIndex, // 默认是 dataIndex, 也可以自行传入
						...element.fieldProps,
					},
				])
			}
			// 处理 tooltip
			let columnElement = element
			if (element.tooltip) {
				const { title, tooltip, fieldProps, search, ...rest } = element
				columnElement = {
					...rest,
					title: () => <TitleTip title={title} tooltip={tooltip} />,
				}
			}
			if (element.field) {
				const ProField = ProFieldMap[element.field]
				columnElement = {
					render: (text) => (
						<ProField
							{...element.fieldProps}
							fetch={i === 0} // 避免多次发送相同的请求
							text={text}
						/>
					),
					...columnElement,
				}
			}
			if (!element.hideInTable) columns.push(columnElement)
		}
		return [columns, QFArray]
	}, [propsColumns])

	const [tableLoading, setTableLoading] = useState<ButtonProps["loading"]>(
		false
	) // table loading 效果
	useLayoutEffect(() => {
		setTableLoading(propsLoading)
	}, [propsLoading])

	const rowSelection = useMemo<TableProps<any>["rowSelection"]>(() => {
		return {
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(
					`selectedRowKeys: ${selectedRowKeys}`,
					"selectedRows: ",
					selectedRows
				)
			},
			onSelect: (record, selected, selectedRows) => {
				console.log(record, selected, selectedRows)
			},
			onSelectAll: (selected, selectedRows, changeRows) => {
				console.log(selected, selectedRows, changeRows)
			},
			...propsRowSelection,
		}
	}, [propsRowSelection])

	const handleSearch = async (values: any) => {
		setTableLoading({ delay: 100 })
		await onSearch?.(values)
		setTableLoading(false)
	}

	return (
		<div className={styles.pro_table_wrap}>
			<QueryFilter
				loading={tableLoading}
				className={classNames("mb-10", {
					hidden: !search,
				})}
				onFinish={handleSearch}
			>
				{renderQueryFilter(QFArray)}
			</QueryFilter>

			<Table
				{...rest}
				loading={tableLoading}
				columns={columns}
				rowSelection={rowSelection}
			/>
		</div>
	)
}
export default memo(
	withDefaultProps(ProTable, {
		search: true,
	})
)
