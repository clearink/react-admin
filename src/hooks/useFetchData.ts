import { useEffect, useMemo, useReducer } from "react"
import { isString, isUndefined } from "../utils/validate"
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
export default function useFetchData(
	method: "get" | "post" = "get",
	fetchUrl?: string | { url: string; params?: object },
	fetch: boolean = true
) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const kvEntities = useTypedSelector((state) => state.kv.entities)

	const [url, params] = useMemo(() => {
		if (isUndefined(fetchUrl)) return [undefined, undefined]
		if (isString(fetchUrl)) return [fetchUrl, {}]
		return [fetchUrl.url, fetchUrl.params]
	}, [fetchUrl])

	useEffect(() => {
		const realUrl = `${url}?${JSON.stringify(params)}`
		const preData = kvEntities[realUrl]
		if (preData) {
			return dispatch(actions.setData(preData.value))
		}
		if (isUndefined(url) || !fetch) return
		;(async () => {
			try {
				// 存在 直接保存
				dispatch(actions.startFetch()) // 发起请求
				const { data } = await http[method as any]?.(url, params)
				dispatch(actions.setData(data)) // save data
				boundKvActions.add({ key: realUrl, value: data }) // save data to store
			} catch (error) {
				dispatch(actions.setError(error)) // save error
			}
		})()
	}, [url, params, kvEntities, fetch, method])
	return state
}
