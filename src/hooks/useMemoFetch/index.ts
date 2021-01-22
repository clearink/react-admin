import { useEffect } from "react"
import http from "@/http"
import { actions as kvActions } from "@/store/reducers/kv"
import GetBoundAction from "@/utils/store/GetBoundAction"
import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import useMountedRef from "@/components/Pro/hooks/mounted-ref"
import useDeepEqual from "@/components/Pro/hooks/deep-equal"
import useMethods from "@/components/Pro/hooks/methods/useMethods"
import useTypedSelector from "../useTypedSelector"
import useDeepMemo from "@/components/Pro/hooks/deep-memo"
import { FetchProps } from "./interface"
import reducers, { initialState } from "./reducer"

/* 基本的 获取数据 hook 
  默认使用封装过的 axios
	返回 loading data 
	通过 url 当 key 将所有的数据存放到 store 检测到有数据后直接返回不用发请求
*/

export type UseMemoFetchProps = FetchProps

const boundKvActions = GetBoundAction(kvActions)
export default function useMemoFetch(props: UseMemoFetchProps) {
	const { url, params, method = "get", cache, transform, auto = true } =
		props ?? {}

	const mountedRef = useMountedRef() // 是否挂载标志
	const kvEntities = useTypedSelector((state) => state.kv.entities) // kv store
	const [state, methods] = useMethods(reducers, initialState)

	const realUrl = useDeepMemo(() => `${url}${JSON.stringify(params)}`, [
		url,
		params,
	])
	const memoData = kvEntities[realUrl]?.value // 缓存

	useEffect(() => {
		// 缓存的值发生该变 需要更新data
		if (cache && memoData) {
			methods.setLoading(false)
			methods.setData(memoData)
		}
	}, [memoData, cache, methods])

	// 可以传入一个布尔值 决定是否抛弃缓存
	const fetchData = useMemoCallback(async (update?: boolean) => {
		if (!url) return
		if (memoData && !update) {
			const result = transform?.(memoData, true) ?? memoData
			methods.setData(result)
			return
		}
		methods.setLoading(true)
		const { data } = await http[method as any](url, params)
		const result = transform?.(data, false) ?? data
		if (!mountedRef.current) return
		methods.setLoading(false)
		if (cache) {
			boundKvActions[update ? "update" : "add"]({ key: realUrl, value: result }) // save redux store
		} else {
			methods.setData(result)
		}
	}, [])

	// params 或者url变化重新请求
	const paramsEqual = useDeepEqual(params)
	const urlEqual = useDeepEqual(url)
	useEffect(() => {
		if (!auto) return
		if (!paramsEqual || !urlEqual) fetchData()
	}, [paramsEqual, urlEqual, fetchData, auto])

	const updateMemo = useMemoCallback(() => {
		fetchData(true)
	}, [])

	return [state, fetchData, updateMemo] as const
}
