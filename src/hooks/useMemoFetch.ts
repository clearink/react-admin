import { useEffect } from "react"
import http from "@/http"
import { actions as kvActions } from "@/store/reducers/kv"
import GetBoundAction from "@/utils/GetBoundAction"
import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import useMountedRef from "@/components/Pro/hooks/mounted-ref"
import useDeepEqual from "@/components/Pro/hooks/deep-equal"
import useMethods from "@/components/Pro/hooks/methods/useMethods"
import useTypedSelector from "./useTypedSelector"

/* 基本的 获取数据 hook 
  仅支持 GET
  默认使用封装过的 axios
	返回 loading data error
	
	需求 期望通过 url 当 key 将所有的数据存放到 store 检测到有数据后直接返回不用发请求
 
*/

const boundKvActions = GetBoundAction(kvActions)
interface CommonServerData<T = any> {
	code: number
	message: string
	result?: T
	success: boolean
}
export interface useFetchDataProps {
	/** 请求地址 地址为空不请求 */
	url?: string
	/**  请求参数 */
	params?: object
	/** 请求方式 */
	method?: "get" | "post" | "delete" | "put"
	/** 是否需要缓存 */
	cache?: boolean
	/** 自动请求一次 */
	auto?: boolean
	/** 转换数据 以是否有 result 为 标志 */
	transform?: (response: CommonServerData) => any
}
const initialState = {
	data: null as any,
	loading: false,
}
const reducers = {
	setData(state: any, data: any) {
		return { ...state, data }
	},
	setLoading(state: any, loading: boolean) {
		return { ...state, loading }
	},
}
// 再提供一个更新缓存的函数
export default function useMemoFetch(props: useFetchDataProps) {
	const { url, params, method = "get", cache, transform, auto = true } =
		props ?? {}

	const mountedRef = useMountedRef() // 是否挂载标志
	const kvEntities = useTypedSelector((state) => state.kv.entities) // kv store
	const [state, methods] = useMethods(reducers, initialState)

	// 可以传入一个布尔值 决定是否抛弃缓存
	const fetchData = useMemoCallback(async (update?: boolean) => {
		const realUrl = `${url}${JSON.stringify(params)}`
		const memoData = kvEntities[realUrl]?.value // 缓存
		methods.setLoading(true)
		if (memoData && !update) {
			methods.setData(memoData)
			methods.setLoading(false)
			return
		}
		if (!url) return
		const { data } = await http[method as any](url, params)
		const result = transform?.(data) ?? data
		if (!mountedRef.current) return
		methods.setData(result)
		methods.setLoading(false)
		if (cache) {
			boundKvActions[update ? "update" : "add"]({ key: realUrl, value: result }) // save redux store
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
