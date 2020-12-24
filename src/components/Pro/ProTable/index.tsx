import React, {
	cloneElement,
	forwardRef,
	memo,
	Ref,
	useCallback,
	useEffect,
	useImperativeHandle,
	useLayoutEffect,
	useMemo,
	useReducer,
	useRef,
} from "react"
import { Table, Tooltip } from "antd"
import classNames from "classnames"
import { ColumnsType, TableProps } from "antd/lib/table"
import { ProTableColumns, ProTableRef } from "./type"
import { QueryFilter } from "../ProForm/components"
import styles from "./style.module.scss"
import renderQueryFilter from "../utils/renderQueryFilter"
import { nanoid } from "@reduxjs/toolkit"
import { QueryFilterProps } from "../ProForm/components/QueryFilter"
import withDefaultProps from "@/hocs/withDefaultProps"
import { TitleTip } from "../ProCard/components"
import { FieldText, ProFieldMap } from "../ProField"
import { isFunction, isString } from "@/utils/validate"
import useFetchData from "@/hooks/useFetchData"
import { RequestProps } from "../ProField/type"
import { actions, initialState, reducer } from "./reducer"

// TODO queryFilter props
/**
 * search 属性 在 query filter中显示
 *
 * Q1: 文本 or status 如何显示在 table 中呢
 * 更加 pro components 来看 是根据 field 字段决定 render时所用的组件
 * Q2 propsLoading 如何在外部控制 query filter (base form) submitter 的 loading?
 * Q3 处理分页逻辑

 */
export interface ProTableProps<T extends object>
	extends Omit<TableProps<T>, "columns" | "rowSelection"> {
	columns?: ProTableColumns<T>[]
	onSearch?: (values: any) => any
	searchProps?: Partial<Omit<QueryFilterProps, "collapsed">>
	search: boolean
	request?: RequestProps
}

function ProTable<T extends object>(
	props: ProTableProps<T>,
	ref: Ref<ProTableRef>
) {
	const {
		onSearch,
		search,
		columns: propsColumns,
		loading: propsLoading,
		request,
		dataSource: propsDataSource,
		...rest
	} = props

	const [reducerState, dispatch] = useReducer(reducer, initialState)

	const { data, loading: fetchLoading } = useFetchData({
		...request,
		cache: false,
	})

	useEffect(() => {
		dispatch(actions.changeLoading(fetchLoading))
	}, [fetchLoading])

	const dataSource = useMemo(() => {
		if (propsDataSource) return propsDataSource
		return data ?? []
	}, [data, propsDataSource])

	useLayoutEffect(() => {
		dispatch(actions.changeLoading(propsLoading))
	}, [propsLoading])

	const handleReset = useCallback(() => {
		/* 
			table 重置
		1. 页码  = 1
		2. 重新请求数据
		*/
		dispatch(actions.reset())
		// 重新请求数据
	}, [])

	const handleReload = useCallback(() => {
		/**
		 * table 重新加载
		 * 仅仅是重新请求数据
		 *
		 */
	}, [])

	const handleClearSelected = useCallback(() => {
		// 清除选中 的项
		dispatch(actions.changeSelectedRows([]))
	}, [])

	// 暴露的方法
	// TODO: 添加 query filter 的 form
	const tableAction = useMemo(
		() => ({
			reload: handleReload,
			reset: handleReset,
			clearSelected: handleClearSelected,
		}),
		[handleClearSelected, handleReload, handleReset]
	)
	useImperativeHandle(ref, () => tableAction, [tableAction])

	const rowSelection = useMemo<TableProps<any>["rowSelection"]>(() => {
		const rowKey = rest.rowKey
		let selectedRowKeys = reducerState.selectedRows
		// 默认使用 key
		if (isString(rowKey))
			selectedRowKeys = selectedRowKeys.map((item) => item[rowKey])
		else if (isFunction(rowKey)) selectedRowKeys = selectedRowKeys.map(rowKey)
		return {
			selectedRowKeys,
			onSelect: (_, __, selectedRows) => {
				dispatch(actions.changeSelectedRows(selectedRows))
			},
			onSelectAll: (_, selectedRows) => {
				dispatch(actions.changeSelectedRows(selectedRows))
			},
			// 暂时使用 rowKey作为字段
		}
	}, [reducerState.selectedRows, rest.rowKey])

	// 提取 query filter
	const [columns, QFArray] = useMemo(() => {
		const QFArray: any[] = []
		if (!propsColumns) return [[], []]
		const columns = []
		for (let i = 0; i < propsColumns?.length; i += 1) {
			const {
				title,
				tooltip,
				fieldProps,
				field,
				search,
				hideInTable,
				render: CR,
				...columnProps
			} = propsColumns[i]
			const ProField = ProFieldMap[field ?? "text"] ?? FieldText
			// 处理query filter
			if (search) {
				QFArray.push([
					field,
					{
						key: nanoid(8),
						label: title, // 默认是 title 也可以自行传入
						name: columnProps.dataIndex, // 默认是 dataIndex, 也可以自行传入
						...fieldProps,
					},
				])
			}
			// 处理 tooltip
			const { ellipsis, copyable, request } = fieldProps ?? {}
			let DOM = <ProField {...fieldProps} />
			const columnElement: ProTableColumns = {
				title: () => <TitleTip title={title} tooltip={tooltip} />,
				render: (text, record, index) => {
					if (CR) {
						return CR(text, record, index, tableAction)
					}
					if (request)
						DOM = cloneElement(DOM, {
							request: { ...request, fetch: index === 0 },
						})
					// 在省略时,应当防止copyable的tooltips 干扰
					if (ellipsis) {
						return (
							<Tooltip title={text}>
								<span>
									{cloneElement(DOM, {
										copyable: copyable ? { tooltips: false } : null,
										style: { width: columnProps.width },
										text,
									})}
								</span>
							</Tooltip>
						)
					}
					return cloneElement(DOM, { text })
				},
				...columnProps,
			}

			if (!hideInTable) columns.push(columnElement)
		}
		return [columns, QFArray]
	}, [propsColumns, tableAction])

	// 搜索方法
	const handleSearch = async (values: any) => {
		dispatch(actions.changeLoading({ delay: 100 }))
		await onSearch?.(values)
		dispatch(actions.changeLoading(false))
	}

	return (
		<div className={styles.pro_table_wrap}>
			{/* proTable 暂时不提供对 query filter 的配置 后续会增强 search 字段的功能 */}
			<QueryFilter
				loading={reducerState.loading}
				className={classNames("mb-10", {
					hidden: !search,
				})}
				onFinish={handleSearch}
			>
				{renderQueryFilter(QFArray)}
			</QueryFilter>

			<Table
				{...rest}
				dataSource={dataSource}
				loading={reducerState.loading}
				columns={columns as ColumnsType<any>}
				rowSelection={rowSelection}
			/>
		</div>
	)
}
export default memo(
	withDefaultProps(forwardRef(ProTable), {
		search: true,
		rowKey: "key",
	})
)
