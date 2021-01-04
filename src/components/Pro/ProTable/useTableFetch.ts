import { ButtonProps } from "antd/lib/button"
import { useEffect, useRef } from "react"
import useDeepEqual from "../hooks/deep-equal"
import useMemoCallback from "../hooks/memo-callback"
import { Methods } from "../hooks/methods/interface"
import useMethods from "../hooks/methods/useMethods"

type ServerData = {
	data: any
	pageSize: number
	current: number
	total: number
}
export const initialState = {
	current: 1,
	pageSize: 10,
	data: [] as any[],
	total: 0,
	loading: false as ButtonProps["loading"],
	rows: [] as any[],
	params: {}, // querySearch表单值
}
// 控制table数据
type TableData = typeof initialState
export const reducers = {
	setRows: (state: TableData, rows: any[]) => ({
		...state,
		rows,
	}),
	setLoading: (state: TableData, loading: ButtonProps["loading"]) => ({
		...state,
		loading,
	}),
	setData: (state: TableData, data: any) => ({ ...state, data }),

	setCurrent: (state: TableData, current: number) => ({ ...state, current }),
	setPageSize: (state: TableData, pageSize: number) => ({ ...state, pageSize }),
	setTotal: (state: TableData, total: number) => ({ ...state, total }),
	setParams: (state: TableData, params: object) => ({ ...state, params }),
	setServerData: (state: TableData, serverData: ServerData) => {
		return { ...state, ...serverData, loading: false }
	},
	setParentData: (state: TableData, parentData: any[]) => ({
		...state,
		data: parentData,
		total: parentData.length,
		loading: false,
	}),
	// 重置
	reset: (state: TableData, defaultParams: object) => ({
		...initialState,
		params: defaultParams,
	}),
}
export type TableMethods = Methods<typeof reducers, typeof initialState>
export default function useTableFetch(
	fetchData: () => void,
	initialValue?: object
) {
	// 主要是处理 table 中的各种 params
	const fn = useMemoCallback(fetchData, [])

	const [data, methods] = useMethods(reducers, () => ({
		...initialState,
		...initialValue,
	}))

	return [data, methods, fn] as const
}
