import { isString, isUndefined } from "../utils/validate"
import http from "@/http"
import { Reducer, useEffect, useMemo, useReducer } from "react"
import useDeepMemo from "./useDeepMemo"

/* 基本的 获取数据 hook 
  仅支持 GET
  默认使用封装过的 axios
  返回 loading data error
*/
const initialState = {
	data: null,
	error: null,
	loading: true,
}
const AT = {
	START_FETCH: "START_FETCH",
	SAVE_DATA: "SAVE_DATA",
	SAVE_ERROR: "SAVE_ERROR",
}
const reducer: Reducer<any, { type: string; payload?: any }> = (
	state,
	action
) => {
	const { type } = action
	switch (type) {
		case AT.START_FETCH:
			return { ...initialState }
		case AT.SAVE_DATA:
			return { ...state, loading: false, data: action.payload }
		case AT.SAVE_ERROR:
			return { ...state, loading: false, data: action.payload }
		default:
			return state
	}
}
export default function useFetchData(
	fetchUrl?: string | { url: string; params?: object }
) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [url, params] = useMemo(() => {
		if (isString(fetchUrl)) return [fetchUrl, {}]
		if (isUndefined(fetchUrl)) return [undefined, undefined]
		return [fetchUrl.url, fetchUrl.params]
	}, [fetchUrl])
	useEffect(() => {
		;(async () => {
			if (isUndefined(url)) return
			try {
				dispatch({ type: AT.START_FETCH }) // loading: true
				const { data } = await http.get(url, params)
				dispatch({ type: AT.SAVE_DATA, payload: data }) // save data
			} catch (error) {
				dispatch({ type: AT.SAVE_ERROR, payload: error }) // save error
			}
		})()
	}, [url, params])
	return state
}
