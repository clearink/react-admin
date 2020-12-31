import { useCallback, useEffect, useReducer, useRef } from "react"
import http from "@/http"
import useTypedSelector from "@/hooks/useTypedSelector"
import { createSlice } from "@reduxjs/toolkit"
import { actions as kvActions } from "@/store/reducers/kv"
import GetBoundAction from "@/utils/GetBoundAction"
import { useFetchDataProps } from "../useFetchData"
import useAsync from "./useAsync"
import useDeepEqual from "./useDeepEqual"
import useEventEffect from "../useEventEffect"

const initialState = {
	data: null as any,
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
export default function useKvFetch(props: useFetchDataProps) {
	const { url, params, method = "get", cache, transform } = props
	const [state, dispatch] = useReducer(reducer, initialState)
	const kvEntities = useTypedSelector((state) => state.kv.entities)
	const [, fetchData] = useAsync(async () => {
		if (!url) return
		const realUrl = `${url}?${JSON.stringify(params)}`
		const preData = kvEntities[`${url}?${JSON.stringify(params)}`]?.value
		if (preData) {
			dispatch(actions.setData(preData)) // 优先返回缓存
			return
		}

		try {
			dispatch(actions.startFetch())
			const { data } = await http[method as any](url, params)
			if (!isMountRef.current) return // 没有挂载直接 return
			const result = transform?.(data) ?? data
			dispatch(actions.setData(result)) // save data
			if (cache) boundKvActions.add({ key: realUrl, value: result }) // save redux store
		} catch (error) {
			dispatch(actions.setError(error)) // save error
		}
	})

	const isMountRef = useRef(false) // 是否挂载
	useEffect(() => {
		isMountRef.current = true
		return () => {
			isMountRef.current = false
		}
	}, [])

	const cancel = useCallback(() => {
		isMountRef.current = false
  }, [])
  
	const isEqual = useDeepEqual(params)
	useEventEffect(() => {
		if (isEqual) return
		fetchData()
	}, [isEqual])
	return { ...state, fetchData, cancel }
}
