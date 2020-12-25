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
} from "react"
import { Alert, Button, Space, Table, Tooltip } from "antd"
import classNames from "classnames"
import { ColumnsType, TableProps } from "antd/lib/table"
import { ProTableColumns, ProTableProps, ProTableRef } from "./type"
import { QueryFilter } from "../ProForm/components"
import styles from "./style.module.scss"
import renderQueryFilter from "../utils/renderQueryFilter"
import { nanoid } from "@reduxjs/toolkit"
import withDefaultProps from "@/hocs/withDefaultProps"
import { TitleTip } from "../ProCard/components"
import { FieldText, ProFieldMap } from "../ProField"
import { isFunction, isNumber, isString } from "@/utils/validate"
import useFetchData from "@/hooks/useFetchData"
import { actions, initialState, reducer } from "./reducer"
import {
	DownloadOutlined,
	PlusOutlined,
	ReloadOutlined,
	ToTopOutlined,
} from "@ant-design/icons"
import useDeepMemo from "@/hooks/useDeepMemo"
import useMemoEffect from "@/hooks/useMemoEffect"

// TODO queryFilter props
/**
 * search 属性 在 query filter中显示
 *
 * Q1: 文本 or status 如何显示在 table 中呢
 * 更加 pro components 来看 是根据 field 字段决定 render时所用的组件
 * Q2 propsLoading 如何在外部控制 query filter (base form) submitter 的 loading?
 * Q3 处理分页逻辑
 * Q4 分页重新请求处理
 *
 *
 */

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
		dataSource: PD,
		title,
		renderTitle,
		transform,
		...rest
	} = props

	const [reducerState, dispatch] = useReducer(reducer, initialState)

	const { data, loading: fetchLoading, reload } = useFetchData({
		...request,
		cache: false,
	})
	useEffect(() => {
		dispatch(actions.changeLoading(fetchLoading))
	}, [fetchLoading])

	useMemoEffect(
		(transform) => {
			if (data) transform(data, dispatch, actions)
		},
		[data],
		transform
	)
	useEffect(() => {
		if (!PD) return
		dispatch(actions.changeData(PD))
		dispatch(actions.changeTotal(PD.length))
	}, [PD])

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

	const handleClearSelected = useCallback(() => {
		// 清除选中 的项
		dispatch(actions.changeSelectedRows([]))
	}, [])

	// 暴露的方法
	// TODO: 添加 query filter 的 form
	const tableAction = useMemo(
		() => ({
			reload,
			reset: handleReset,
			clearSelected: handleClearSelected,
		}),
		[handleClearSelected, handleReset, reload]
	)
	useImperativeHandle(ref, () => tableAction, [tableAction])

	const rowSelection = useMemo<TableProps<T>["rowSelection"]>(() => {
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
	const [columns, QFArray] = useDeepMemo(() => {
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
					if (CR) return CR(text, record, index, tableAction)

					// 如果下放到search时会自动请求的,也应该阻止掉
					if (request)
						DOM = cloneElement(DOM, {
							request: { ...request, fetch: index === 0 && !search },
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

	/* 渲染出 tableHeader
	外部暴露出一个 renderTitle(dom, data, action)
	*/
	const TT = useDeepMemo(() => {
		if (isString(title)) return <TitleTip title={title} />
		return <TitleTip title={title?.title} tooltip={title?.tooltip} />
	}, [title])

	const BT = (() => {
		const SL = reducerState.selectedRows.length
		return (
			<div className={styles.banner_title}>
				<span
					className={classNames(styles.selected_info, {
						hidden: SL === 0,
					})}
				>
					已选择
					<span className={styles.number}>{SL}</span>条
					<span
						className={styles.clear_select}
						onClick={() => dispatch(actions.changeSelectedRows([]))}
					>
						清空
					</span>
				</span>
				<div className={styles.extra}>
					<span>
						共计
						<span className={styles.number}>{reducerState.total}</span>
						条数据
					</span>
					<span className='ml-4'>
						当前第
						<span className={styles.number}>{reducerState.current}</span>页
					</span>
				</div>
			</div>
		)
	})()

	const tableTitle = (() => {
		const DOM = (
			<>
				<div className={styles.title_header}>
					<div className={styles.title}>{TT}</div>
					<div className={styles.extra}>
						<Space>
							<Button type='primary' icon={<PlusOutlined />}>
								新增数据
							</Button>
							<Button icon={<DownloadOutlined />}>导入数据</Button>
							<Button icon={<ToTopOutlined />}>导出数据</Button>
							<ReloadOutlined onClick={reload} />
						</Space>
					</div>
				</div>
				<Alert banner message={BT} showIcon type='info' />
			</>
		)
		// 外部渲染

		return (
			<div className={styles.table_toolbar_wrap}>
				{renderTitle?.(reducerState, dispatch, actions) ?? DOM}
			</div>
		)
	})()

	/** 搜索方法
	 * 应该将请求体url params 都一并存到reducer中
	 * 同时应该区分 默认值与查询值
	 *
	 */

	const handleSearch = async (values: any) => {
		dispatch(actions.changeLoading({ delay: 100 }))
		await onSearch?.(values)
		dispatch(actions.changeLoading(false))
	}

	const handlePaginationChange = (page: number, pageSize?: number) => {
		dispatch(actions.changeCurrent(page))
		if (isNumber(pageSize)) dispatch(actions.changePageSize(pageSize))
		// onSearch?.()
	}
	return (
		<div className={styles.pro_table_wrap}>
			{/* proTable 暂时不提供对 query filter 的配置 后续会增强 search 字段的功能 */}
			<QueryFilter
				className={classNames("mb-10", {
					hidden: !search,
				})}
				onFinish={handleSearch}
			>
				{renderQueryFilter(QFArray)}
			</QueryFilter>
			<div className='bg-white'>
				{tableTitle}
				<Table
					{...rest}
					className={classNames("px-10 bg-white", rest.className)}
					dataSource={reducerState.data}
					loading={reducerState.loading}
					columns={columns as ColumnsType<any>}
					rowSelection={rowSelection}
					// 分页
					pagination={{
						current: reducerState.current,
						total: reducerState.total,
						pageSize: reducerState.pageSize,
						onChange: handlePaginationChange,
					}}
				/>
			</div>
		</div>
	)
}
export default memo(
	withDefaultProps(forwardRef(ProTable), {
		search: true,
		rowKey: "key",
	})
)
