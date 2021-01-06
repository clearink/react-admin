import React, {
	forwardRef,
	memo,
	Ref,
	useEffect,
	useImperativeHandle,
	useMemo,
} from "react"
import { Button, Modal, Space, Table } from "antd"
import classNames from "classnames"
import { ColumnsType, TableProps } from "antd/lib/table"
import { ProTableProps, ProTableRef } from "./type"
import { QueryFilter } from "../ProForm"
import styles from "./style.module.scss"
import renderQueryFilter from "../utils/renderQueryFilter"
import withDefaultProps from "@/hocs/withDefaultProps"
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
import useTableFetch from "./useTableFetch"
import http from "@/http"
import useMountedRef from "../hooks/mounted-ref"
import useTrackedEffect from "../hooks/tracked-effect"
import useMemoCallback from "../hooks/memo-callback"
/**
 * search 属性 在 query filter中显示
 *
 * Q1: 文本 or status 如何显示在 table 中呢
 * 更加 pro components 来看 是根据 field 字段决定 render时所用的组件
 * Q2 propsLoading 如何在外部控制 query filter (base form) submitter 的 loading?
 * Q3 处理分页逻辑
 * Q4 分页重新请求处理
 * Q5 外部params 改变如何映射到内部 ref
 *
 */

function ProTable<T extends object>(
	props: ProTableProps<T>,
	ref: Ref<ProTableRef | undefined>
) {
	const {
		onSearch,
		search,
		columns: PCol,
		loading: PLoading,
		request,
		dataSource: PDataSource,
		title,
		renderAction,
		renderTitle,
		onCreate,
		transform,
		onDelete,
		...rest
	} = props

	// 处理 table 请求
	const mountedRef = useMountedRef()
	const [state, methods, fetchData] = useTableFetch(async () => {
		const url = request?.url
		if (!url) return
		const method = request?.method ?? "post"
		try {
			methods.setLoading(true)
			const { data } = await http[method as any](url, state.params)
			if (!mountedRef.current) return // 如果 已经销毁了
			if (!data || !transform) return
			methods.setServerData(transform(data))
		} catch (error) {
			methods.setLoading(false)
		}
	}, request?.params)

	useEffect(() => {
		fetchData()
	}, [fetchData, state.params])

	// 外部传入的 dataSource
	useEffect(() => {
		if (!PDataSource) return
		methods.setParentData(PDataSource)
	}, [PDataSource, methods])

	// 暴露的方法
	// TODO: 添加 query filter 的 form
	const handleReset = useMemoCallback(
		() => methods.reset(request?.params ?? {}),
		[]
	)
	const tableAction = useMemo(
		() => ({
			setParams: methods.setParams, // 外部如何能够该变table内部的params呢?
			reload: fetchData,
			reset: handleReset,
			clearRows: () => methods.setRows([]),
		}),
		[fetchData, methods, handleReset]
	)
	useImperativeHandle(ref, () => tableAction, [tableAction])

	// 选择
	const rowSelection = useMemo<TableProps<T>["rowSelection"]>(() => {
		return {
			preserveSelectedRowKeys: true,
			selectedRowKeys: state.rows,
			onChange: methods.setRows,
		}
	}, [methods.setRows, state.rows])

	const [columns, QFArray] = useMemo(
		() => renderTableColumn(PCol ?? [], tableAction),
		[PCol, tableAction]
	)
	useTrackedEffect(
		(changes) => {
			console.log(changes)
		},
		[fetchData, methods, handleReset]
	)

	/** 搜索方法 	 */
	const handleSearch = (values: any, type: "form" | "table" = "form") => {
		const isSearch = type === "form"
		const searchParams = isSearch
			? { params: state.params, form: values }
			: values
		try {
			methods.setLoading({ delay: 50 })
			console.log("12312312")
			if (onSearch) {
				const params = onSearch(searchParams)
				methods.setParams(params)
			}
		} finally {
			methods.setLoading(false)
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
				params: state.params,
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
				await onDelete?.(state.rows)
				// 没啥用
				await sleep(100)
				methods.reset(request?.params ?? {})
			},
		})
	}

	const tableTitleExtra = (() => {
		const actions = [
			<Button
				type='primary'
				danger
				className={classNames({ hidden: !state.rows.length })}
				onClick={handleDelete}
				icon={<DeleteOutlined />}
				key='delete'
			>
				删除数据
			</Button>,
			<Button
				type='primary'
				icon={<PlusOutlined />}
				onClick={onCreate}
				key='add'
			>
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
		if (renderAction) return renderAction(actions)
		return actions
	})()
	// 列表数据改变

	return (
		<ProTableContext.Provider value={{ state, methods }}>
			<div className={styles.pro_table_wrap}>
				{/* proTable 暂时不提供对 query filter 的配置 后续会增强 search 字段的功能 */}
				<QueryFilter
					name='table-query-filter'
					loading={state.loading}
					className={classNames("mb-10", {
						hidden: !search,
					})}
					submitConfig={{
						resetProps: {
							onClick: () => {
								methods.reset(request?.params ?? {})
							},
						},
					}}
					onFinish={handleSearch}
				>
					{renderQueryFilter(QFArray)}
				</QueryFilter>
				<div className='bg-white'>
					<div className={styles.table_toolbar_wrap}>
						{renderTitle?.(state, methods, tableTitleExtra) ?? (
							<TableTitle
								title={title}
								extra={<Space>{tableTitleExtra}</Space>}
							/>
						)}
					</div>

					<Table
						showSorterTooltip={false}
						loading={state.loading}
						{...rest}
						className={classNames("px-10 bg-white", rest.className)}
						dataSource={state.data}
						columns={columns as ColumnsType<any>}
						rowSelection={rowSelection}
						// 分页
						pagination={{
							current: state.current,
							total: state.total,
							pageSize: state.pageSize,
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
		bordered: true,
		size: "middle",
		rowKey: "key",
	})
)
