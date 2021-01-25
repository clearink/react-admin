import http from "@/http"
import GetServiceContext from "@/utils/store/GetServiceContext"
import { sleep } from "@/utils/test"
import { Form, Modal } from "antd"
import { TableProps } from "antd/lib/table"
import { useEffect, useMemo } from "react"
import useMountedRef from "../hooks/mounted-ref"
import renderTableColumn from "./renderTableColumn"
import { ProTableProps } from "./type"
import useTableFetch from "./useTableFetch"

export const ProTableServiceContext = GetServiceContext(useProTableService)
export default function useProTableService<T extends object>(
	props: ProTableProps<T>
) {
	const { request, dataSource, columns, onSearch, onDelete } = props
	const [form] = Form.useForm()

	// 数据
	const mountedRef = useMountedRef()
	const [state, methods, fetchData] = useTableFetch(async () => {
		const url = request?.url
		const transform = request?.transform
		if (!url) return
		const method = request?.method ?? "post"
		try {
			methods.setLoading({ delay: 100 })
			const { data } = await http[method as any](url, state.params)
			// 组件已经销毁被视为失败
			if (!mountedRef.current) return
			methods.setServerData(transform?.(data) ?? data)
		} catch (error) {
			methods.setLoading(false)
		}
	}, request?.params)

	useEffect(() => {
		fetchData()
	}, [fetchData, state.params])
	// 外部传入的 dataSource
	useEffect(() => {
		if (!dataSource) return
		methods.setParentData(dataSource)
	}, [dataSource, methods])
	const params = request?.params ?? {}
	const action = {
		setParams: methods.setParams, // 外部如何能够该变table内部的params呢?
		reload: fetchData,
		reset: () => methods.reset(params ?? {}),
		clearRows: () => methods.setRows([]),
	}
	// 选择
	const rowSelection: TableProps<T>["rowSelection"] = {
		preserveSelectedRowKeys: true,
		selectedRowKeys: state.rows,
		onChange: methods.setRows,
	}
	const [tableColumns, searchList] = useMemo(
		() => renderTableColumn(columns ?? []),
		[columns]
	)
	const handleSearch = (values: any, type: "form" | "table" = "form") => {
		const isSearch = type === "form"
		const searchParams = isSearch
			? { params: state.params, form: values }
			: values
		try {
			methods.setLoading({ delay: 100 })
			if (onSearch) {
				const params = onSearch(searchParams)
				methods.setParams(params)
			}
		} finally {
			methods.setLoading(false)
		}
	} // 分页、排序、筛选变化时触发
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
	} // 删除比较重要, 规定二次弹窗
	const handleDelete = () => {
		Modal.warning({
			title: "确定要删除该数据吗?",
			content: "操作后该数据将会移除 请注意!!",
			async onOk() {
				try {
					await onDelete?.(state.rows)
					methods.reset(request?.params ?? {})
				} catch (error) {
					return Promise.resolve()
				} finally {
					await sleep(100) // 没啥用
				}
			},
		})
	}
	return {
		state,
		form,
		methods,
		fetchData,
		action,
		rowSelection,
		columns: tableColumns,
		searchList,
		handleSearch,
		handleTableChange,
		handleDelete,
	}
}
