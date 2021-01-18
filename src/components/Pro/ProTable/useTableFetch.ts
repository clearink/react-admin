import { ButtonProps } from "antd/lib/button"
import { useEffect, useRef } from "react"
import useMemoCallback from "../hooks/memo-callback"
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
export const reducers = {
	setRows: (state: any, rows: any[]) => ({
		...state,
		rows,
	}),
	setLoading: (state: any, loading: ButtonProps["loading"]) => ({
		...state,
		loading,
	}),
	setData: (state: any, data: any) => ({ ...state, data }),

	setCurrent: (state: any, current: number) => ({ ...state, current }),
	setPageSize: (state: any, pageSize: number) => ({ ...state, pageSize }),
	setTotal: (state: any, total: number) => ({ ...state, total }),
	setParams: (state: any, params: object) => ({ ...state, params }),
	setServerData: (state: any, serverData: ServerData) => {
		return { ...state, ...serverData, loading: false }
	},
	setParentData: (state: any, parentData: any[]) => ({
		...state,
		data: parentData,
		total: parentData.length,
		loading: false,
	}),
	// 重置时需要设置成默认的
	reset: (state: any, defaultParams: object) => ({
		...initialState,
		data: state.data,
		total: state.total,
		params: { ...defaultParams },
	}),
}
export default function useTableFetch(fetchData: () => void, params?: any) {
	// 主要是处理 table 中的各种 params
	const fn = useMemoCallback(fetchData, [])

	const [data, methods] = useMethods(reducers, () => ({
		...initialState,
		params,
	}))

	return [data, methods, fn] as const
}
