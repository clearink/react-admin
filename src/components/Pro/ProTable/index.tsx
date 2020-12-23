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
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { ButtonProps } from "antd/lib/button"
import { QueryFilterProps } from "../ProForm/components/QueryFilter"
import withDefaultProps from "@/hocs/withDefaultProps"
import { TitleTip } from "../ProCard/components"
import { FieldText, ProFieldMap } from "../ProField"
import { isFunction, isString } from "@/utils/validate"
import useFetchData from "@/hooks/useFetchData"
import { RequestProps } from "../ProField/type"

// TODO queryFilter props
/**
 * search 属性 在 query filter中显示
 *
 * Q1: 文本 or status 如何显示在 table 中呢
 * 更加 pro components 来看 是根据 field 字段决定 render时所用的组件
 *	Q2 propsLoading 如何在外部控制 query filter (base form) submitter 的 loading?
 */

/**
	* table 自己维护的字段有
		1. 分页相关
		current 
		pageSize

		2. loading 相关

		table 的loading 可以传到 query filter 中

		3. 选择项相关
		
		4. data
			远程请求的数据
		// current 与 value


	*/
export interface ProTableProps<T extends object>
	extends Omit<TableProps<T>, "columns" | "rowSelection">,
		RequestProps {
	columns?: ProTableColumns<T>[]
	onSearch?: (values: any) => any
	searchProps?: Partial<Omit<QueryFilterProps, "collapsed">>
	search: boolean
}
const initialState = {
	current: 1,
	pageSize: 10,
	loading: false as ButtonProps["loading"],
	selectedRows: [] as any[],
	data: [] as any[],
}

const { reducer, actions } = createSlice({
	name: "proTable",
	initialState: initialState,
	reducers: {
		// 下一页
		nextCurrent(state) {
			state.current += 1
		},
		preCurrent(state) {
			state.current -= 1
		},

		// 改变 pageSize
		changePageSize(state, action: PayloadAction<number>) {
			state.pageSize = action.payload
		},
		// 改变 选中
		changeSelectedRows(state, action: PayloadAction<any[]>) {
			// 默认是使用id 如何能够让用户修改
			state.selectedRows = action.payload
		},
		// loading
		changeLoading(state, action: PayloadAction<ButtonProps["loading"]>) {
			state.loading = action.payload
		},
		// 重置
		reset() {
			return initialState
		},
	},
})

function ProTable<T extends object>(
	props: ProTableProps<T>,
	ref: Ref<ProTableRef>
) {
	const {
		onSearch,
		search,
		columns: propsColumns,
		loading: propsLoading,
		fetchUrl,
		fetchMethod,
		fetch,
		transform,
		...rest
	} = props
	const [reducerState, dispatch] = useReducer(reducer, initialState)
	const { data, loading: fetchLoading } = useFetchData(
		fetchMethod,
		fetchUrl,
		fetch && !rest.dataSource
	)

	const memoTransform = useRef(transform)

	useEffect(() => {
		memoTransform.current = transform
	}, [transform])

	useEffect(() => {
		console.log(fetchLoading, data)
		// 转换 data
		dispatch(actions.changeLoading(fetchLoading))
	}, [data, fetchLoading])

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
				render: columnRender,
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
			const { ellipsis, copyable } = fieldProps ?? {}
			const DOM = <ProField {...fieldProps} fetch={i === 0} /> // fetch 防止多次发送请求
			const columnElement: ProTableColumns = {
				title: () => <TitleTip title={title} tooltip={tooltip} />,
				render: (text, record, index) => {
					if (columnRender) {
						return columnRender(text, record, index, tableAction)
					}

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
		fetch: true,
		rowKey: "key",
		fetchMethod: "post",
	})
)
