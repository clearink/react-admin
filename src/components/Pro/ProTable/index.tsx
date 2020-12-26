import React, {
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
import { Button, Modal, Space, Table } from "antd"
import classNames from "classnames"
import { ColumnsType, TableProps } from "antd/lib/table"
import { ProTableProps, ProTableRef } from "./type"
import { QueryFilter } from "../ProForm"
import styles from "./style.module.scss"
import renderQueryFilter from "../utils/renderQueryFilter"
import withDefaultProps from "@/hocs/withDefaultProps"
import { isFunction, isNumber, isString } from "@/utils/validate"
import useFetchData from "@/hooks/useFetchData"
import { actions, initialState, reducer } from "./reducer"
import useDeepMemo from "@/hooks/useDeepMemo"
import useMemoEffect from "@/hooks/useMemoEffect"
import renderTableColumn from "../utils/renderTableColumn"
import TableTitle from "./components/TableTitle"
import ProTableContext from "./ProTableContext"
import {
	DeleteOutlined,
	DownloadOutlined,
	ExclamationCircleOutlined,
	PlusOutlined,
	ReloadOutlined,
	ToTopOutlined,
} from "@ant-design/icons"
import { sleep } from "@/utils/test"

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
		onCurrentChange,
		search,
		columns: propsColumns,
		loading: propsLoading,
		request,
		dataSource: PD,
		title,
		renderTitle,
		transform,
		onDelete,
		...rest
	} = props

	const [reducerState, dispatch] = useReducer(reducer, initialState)
	// 是否需要将 defaultParams 存入 reducer ?
	// defaultParams 是由外部控制 不需要存入
	const params = useMemo(() => {
		return { ...reducerState.params, ...(request?.params ?? {}) }
	}, [reducerState.params, request])

	const { data, loading: fetchLoading, reload } = useFetchData({
		...request,
		params,
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

	// 外部传入的 dataSource
	useEffect(() => {
		if (!PD) return
		dispatch(actions.changeData(PD))
		dispatch(actions.changeTotal(PD.length))
	}, [PD])

	useLayoutEffect(() => {
		dispatch(actions.changeLoading(propsLoading))
	}, [propsLoading])

	const handleReload = useCallback(async () => {
		try {
			dispatch(actions.changeLoading({ delay: 100 }))
			await reload()
		} finally {
			dispatch(actions.changeLoading(false))
		}
	}, [reload])
	// 暴露的方法
	// TODO: 添加 query filter 的 form
	const tableAction = useMemo(
		() => ({
			reload: handleReload,
			reset: () => dispatch(actions.reset()),
			clearSelected: () => dispatch(actions.changeSelectedRows([])),
		}),
		[handleReload]
	)
	useImperativeHandle(ref, () => tableAction, [tableAction])

	// 选择
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

	const [columns, QFArray] = useDeepMemo(
		() => renderTableColumn(propsColumns ?? [], tableAction),
		[propsColumns, tableAction]
	)

	/** 搜索方法 	 */
	const handleSearch = async (values: any) => {
		try {
			dispatch(actions.changeLoading({ delay: 100 }))
			await onSearch?.(values, dispatch, actions)
		} finally {
			dispatch(actions.changeLoading(false))
		}
	}

	/** 页码改变 */
	const handlePaginationChange = (page: number, pageSize?: number) => {
		dispatch(actions.changeCurrent(page))
		if (isNumber(pageSize)) dispatch(actions.changePageSize(pageSize))
		onCurrentChange?.(reducerState, dispatch, actions, page, pageSize)
	}

	// 删除比较重要, 规定二次弹窗
	const handleDelete = useCallback(() => {
		Modal.confirm({
			title: "确定要删除该数据吗?",
			icon: <ExclamationCircleOutlined />,
			async onOk() {
				await onDelete?.(reducerState.selectedRows)
				// 没啥用
				await sleep(100)
				dispatch(actions.reset())
			},
		})
	}, [onDelete, reducerState.selectedRows])

	const tableTitleExtra = useMemo(() => {
		return [
			<Button
				type='primary'
				danger
				className={classNames({ hidden: !reducerState.selectedRows.length })}
				onClick={handleDelete}
				icon={<DeleteOutlined />}
				key='delete'
			>
				删除数据
			</Button>,
			<Button type='primary' icon={<PlusOutlined />} key='add'>
				新增数据
			</Button>,
			<Button key='import' icon={<DownloadOutlined />}>
				导入数据
			</Button>,
			<Button key='export' icon={<ToTopOutlined />}>
				导出数据
			</Button>,
			<ReloadOutlined key='reload' onClick={handleReload} />,
		]
	}, [handleDelete, reducerState.selectedRows.length, handleReload])

	return (
		<ProTableContext.Provider value={{ state: reducerState, dispatch }}>
			<div className={styles.pro_table_wrap}>
				{/* proTable 暂时不提供对 query filter 的配置 后续会增强 search 字段的功能 */}
				<QueryFilter
					className={classNames("mb-10", {
						hidden: !search,
					})}
					submitConfig={{
						resetProps: {
							onClick: () => dispatch(actions.reset()),
						},
					}}
					onFinish={handleSearch}
				>
					{renderQueryFilter(QFArray)}
				</QueryFilter>
				<div className='bg-white'>
					<div className={styles.table_toolbar_wrap}>
						{renderTitle?.(
							reducerState,
							dispatch,
							actions,
							tableTitleExtra
						) ?? (
							<TableTitle
								title={title}
								extra={<Space>{tableTitleExtra}</Space>}
							/>
						)}
					</div>

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
		</ProTableContext.Provider>
	)
}
export default memo(
	withDefaultProps(forwardRef(ProTable), {
		search: true,
		rowKey: "key",
	})
)
