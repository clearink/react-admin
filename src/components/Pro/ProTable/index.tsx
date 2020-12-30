import React, {
	forwardRef,
	memo,
	Ref,
	useEffect,
	useImperativeHandle,
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
import useFetchData from "@/hooks/useFetchData"
import { actions, initialState, reducer } from "./reducer"
import renderTableColumn from "../utils/renderTableColumn"
import TableTitle from "./components/TableTitle"
import ProTableContext from "./ProTableContext"
import {
	DeleteOutlined,
	DownloadOutlined,
	PlusOutlined,
	ReloadOutlined,
	ToTopOutlined,
} from "@ant-design/icons"
import { sleep } from "@/utils/test"
import useEventEffect from "@/hooks/useEventEffect"
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
		onDelete,
		...rest
	} = props
	const [reducerState, dispatch] = useReducer(reducer, {
		...initialState,
		params: request?.params ?? {},
	})
	// 是否需要将 defaultParams 存入 reducer ?
	// defaultParams 是由外部控制 不需要存入

	const { data, loading: fetchLoading, fetchData } = useFetchData({
		...request,
		params: reducerState.params,
		cache: false,
	})

	useEventEffect(() => {
		fetchData()
	}, [reducerState.params])

	useEffect(() => {
		dispatch(actions.changeLoading(fetchLoading))
	}, [fetchLoading])

	useEffect(() => {
		dispatch(actions.changeLoading(propsLoading))
	}, [propsLoading])

	useEventEffect(() => {
		if (data) transform?.(data, dispatch, actions)
	}, [data])

	// 外部传入的 dataSource
	useEffect(() => {
		if (!PD) return
		dispatch(actions.changeData(PD))
		dispatch(actions.changeTotal(PD.length))
	}, [PD])

	// 暴露的方法
	// TODO: 添加 query filter 的 form
	const tableAction = useMemo(
		() => ({
			reload: fetchData,
			reset: () => dispatch(actions.reset(request?.params ?? {})),
			clearSelected: () => dispatch(actions.changeSelectedRows([])),
		}),
		[fetchData, request]
	)
	useImperativeHandle(ref, () => tableAction, [tableAction])

	// 选择
	const rowSelection = useMemo<TableProps<T>["rowSelection"]>(() => {
		return {
			preserveSelectedRowKeys: true,
			selectedRowKeys: reducerState.selectedRows,
			onChange: (keys) => dispatch(actions.changeSelectedRows(keys)),
		}
	}, [reducerState.selectedRows])

	const [columns, QFArray] = useMemo(
		() => renderTableColumn(propsColumns ?? [], tableAction),
		[propsColumns, tableAction]
	)

	/** 搜索方法 	 */
	const handleSearch = (values: any, type: "form" | "table" = "form") => {
		const isSearch = type === "form"
		const searchParams = isSearch
			? { params: reducerState.params, form: values }
			: values
		try {
			dispatch(actions.changeLoading({ delay: 50 }))
			if (onSearch) {
				const params = onSearch(searchParams)
				dispatch(actions.changeParams(params))
			}
		} finally {
			dispatch(actions.changeLoading(false))
		}
	}
	// 分页、排序、筛选变化时触发
	const handleTableChange: TableProps<any>["onChange"] = (
		pagination,
		filters,
		sorter
	) => {
		handleSearch(
			{
				pagination,
				filters,
				sorter,
				params: reducerState.params,
			},
			"table"
		)
	}

	// 删除比较重要, 规定二次弹窗
	const handleDelete = () => {
		Modal.warning({
			title: "确定要删除该数据吗?",
			content: "操作后该数据将会移除 请注意!!",
			async onOk() {
				await onDelete?.(reducerState.selectedRows)
				// 没啥用
				await sleep(100)
				dispatch(actions.reset(request?.params ?? {}))
			},
		})
	}

	const tableTitleExtra = (() => {
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
			<ReloadOutlined key='reload' onClick={fetchData} />,
		]
	})()
	// 列表数据改变

	return (
		<ProTableContext.Provider value={{ state: reducerState, dispatch }}>
			<div className={styles.pro_table_wrap}>
				{/* proTable 暂时不提供对 query filter 的配置 后续会增强 search 字段的功能 */}
				<QueryFilter
					loading={reducerState.loading}
					className={classNames("mb-10", {
						hidden: !search,
					})}
					submitConfig={{
						resetProps: {
							onClick: () => dispatch(actions.reset(request?.params ?? {})),
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
						showSorterTooltip={false}
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
						}}
						// 同样改变 params
						onChange={handleTableChange}
					/>
				</div>
			</div>
		</ProTableContext.Provider>
	)
}
export default memo(
	withDefaultProps(forwardRef(ProTable), {
		search: true,
		size: "middle",
		rowKey: "key",
	})
)
