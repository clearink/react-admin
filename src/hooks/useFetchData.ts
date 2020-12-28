import { useCallback, useEffect, useMemo, useReducer, useRef } from "react"
import http from "@/http"
import useTypedSelector from "@/hooks/useTypedSelector"
import { createSlice } from "@reduxjs/toolkit"
import { actions as kvActions } from "@/store/reducers/kv"
import GetBoundAction from "@/utils/GetBoundAction"

/* 基本的 获取数据 hook 
  仅支持 GET
  默认使用封装过的 axios
	返回 loading data error
	
	需求 期望通过 url 当 key 将所有的数据存放到 store 检测到有数据后直接返回不用发请求

	// 默认不会自动发送请求
*/
const initialState = {
	data: null,
	error: null,
	loading: false,
}
const { reducer, actions } = createSlice({
	name: "userFetchData",
	initialState,
	reducers: {
		startFetch() {
			return { ...initialState, loading: true }
		},
		setData(state, action) {
			state.loading = false
			state.data = action.payload
		},
		setError(state, action) {
			state.loading = false
			state.error = action.payload
		},
	},
})

const boundKvActions = GetBoundAction(kvActions)
export interface useFetchDataProps {
	/** 请求地址 地址为空不请求 */
	url?: string
	/**  请求参数 */
	params?: object
	/** 请求方式 */
	method?: "get" | "post" | "delete" | "put"
	/** 是否自动请求 */
	auto?: boolean
	/** 是否需要缓存 */
	cache?: boolean
	/** 数据转换方法 */
	transform?: (value: any) => any
}
/**
 * 暴露的方法
 * 1. reload or fetchData
 * 2. cancel
 */
export default function useFetchData(props?: useFetchDataProps) {
	// 是否请求  请求方法 请求地址 是否缓存到store
	const { url: fetchUrl, params, method = "get", auto, cache, transform } =
		props ?? {}

	const [state, dispatch] = useReducer(reducer, initialState)
	const kvEntities = useTypedSelector((state) => state.kv.entities)

	const isMountRef = useRef(false) // 是否挂载

	useEffect(() => {
		isMountRef.current = true
		return () => {
			isMountRef.current = false
		}
	}, [])

	const memoData = useRef()

	// realUrl改变的话,检查是否有缓存
	useEffect(() => {
		const preData = kvEntities[`${fetchUrl}?${JSON.stringify(params)}`]?.value
		memoData.current = preData
		if (memoData.current) dispatch(actions.setData(memoData.current)) // 优先返回缓存
	}, [fetchUrl, kvEntities, params])

	const memoTransform = useRef(transform)
	memoTransform.current = transform
	const fetchData = useCallback(async () => {
		// 请求地址为空 或者 有缓存 不用请求
		if (!fetchUrl || state.loading || memoData.current) return
		const realUrl = `${fetchUrl}?${JSON.stringify(params)}`
		try {
			dispatch(actions.startFetch())
			const { data } = await http[method as any]?.(fetchUrl, params)
			if (!isMountRef.current) return // 没有挂载直接 return
			const result = memoTransform.current?.(data) ?? data
			dispatch(actions.setData(result)) // save data
			if (cache) boundKvActions.add({ key: realUrl, value: result }) // save redux store
		} catch (error) {
			dispatch(actions.setError(error)) // save error
		}
	}, [cache, fetchUrl, method, params, state.loading])

	const cancel = useCallback(() => {
		isMountRef.current = false
	}, [])

	const fetchDataRef = useRef(fetchData)
	fetchDataRef.current = fetchData
	/** auto目前是只请求一次的 是否仅仅请求一次呢? 暂定为只请求一次 */
	useEffect(() => {
		if (auto) fetchDataRef.current()
	}, [auto])
	return { ...state, fetchData, cancel }
}

// 需要一个参数 是否让其自动 fetch 数据
