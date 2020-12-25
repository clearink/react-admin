import {
	useCallback,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from "react"
import { isString, isUndefined } from "../utils/validate"
import http from "@/http"
import useTypedSelector from "@/hooks/useTypedSelector"
import { createSlice } from "@reduxjs/toolkit"
import { actions as kvActions } from "@/store/reducers/kv"
import GetBoundAction from "@/utils/GetBoundAction"
import { RequestProps } from "@/components/Pro/ProField/type"
import useDeepMemo from "./useDeepMemo"

/* 基本的 获取数据 hook 
  仅支持 GET
  默认使用封装过的 axios
	返回 loading data error
	
	需求 期望通过 url 当 key 将所有的数据存放到 store 检测到有数据后直接返回不用发请求
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
export default function useFetchData(props?: RequestProps) {
	// 是否请求  请求方法 请求地址 是否缓存到store
	const { fetch = true, method = "get", url, cache = true, transform } =
		props ?? {}
	const [count, setCount] = useState(0)
	const [state, dispatch] = useReducer(reducer, initialState)
	const kvEntities = useTypedSelector((state) => state.kv.entities)

	const memoTransform = useRef(transform)

	useEffect(() => {
		memoTransform.current = transform
	}, [transform])

	// 提取 请求地址 与 参数
	const [fetchUrl, params] = useDeepMemo(() => {
		if (isUndefined(url)) return [undefined, undefined]
		if (isString(url)) return [url]
		return [url.url, url.params]
	}, [url])
	
	const memoData = useRef()
	useEffect(() => {
		const realUrl = `${fetchUrl}?${JSON.stringify(params)}`
		const preData = kvEntities[realUrl]?.value
		memoData.current = preData
		if (preData) dispatch(actions.setData(memoData.current)) // 优先返回缓存
	}, [fetchUrl, kvEntities, params])

	useEffect(() => {
		// 请求地址为空 或者 不允许请求 或者已经在redux中有数据了 直接 return
		if (isUndefined(fetchUrl) || !fetch || memoData.current) return
		;(async () => {
			try {
				// 存在 直接保存
				const realUrl = `${fetchUrl}?${JSON.stringify(params)}`
				dispatch(actions.startFetch()) // 发起请求
				const { data } = await http[method as any]?.(fetchUrl, params)
				const result = memoTransform.current?.(data) ?? data
				dispatch(actions.setData(result)) // save data
				// save data to store
				if (cache) boundKvActions.add({ key: realUrl, value: result })
			} catch (error) {
				dispatch(actions.setError(error)) // save error
			}
		})()
	}, [fetchUrl, params, fetch, method, cache, count])
	const reload = useCallback(() => {
		setCount((p) => p + 1)
	}, [])
	return { ...state, reload }
}
