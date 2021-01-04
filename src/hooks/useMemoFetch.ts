import { useEffect, useState } from "react"
import http from "@/http"
import { actions as kvActions } from "@/store/reducers/kv"
import GetBoundAction from "@/utils/GetBoundAction"
import { AnyFunc } from "@/components/Pro/hooks/memo-callback"
import useActionPending from "@/components/Pro/hooks/action-pending"
import useMountedRef from "@/components/Pro/hooks/mounted-ref"

/* 基本的 获取数据 hook 
  仅支持 GET
  默认使用封装过的 axios
	返回 loading data error
	
	需求 期望通过 url 当 key 将所有的数据存放到 store 检测到有数据后直接返回不用发请求
 
*/

const boundKvActions = GetBoundAction(kvActions)

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
	/** 转换数据 */
	transform?: AnyFunc
}
export default function useMemoFetch(props: useFetchDataProps) {
	const [data, setData] = useState<any | null>(null)
	const mountedRef = useMountedRef() // 是否挂载标志

	const { url, params, method, cache, transform, auto = true } = props ?? {}

	const [count, fn] = useActionPending(async () => {
		const realUrl = `${url}${JSON.stringify(params)}`

		const memoData = kvActions[realUrl]?.value // 缓存
		if (memoData) return memoData

		if (!url) return

		const { data } = await http[method as any](url, params)
		const result = transform?.(data) ?? data
		if (!mountedRef.current) return

		setData(result)
		if (cache) boundKvActions.add({ key: realUrl, value: data }) // save redux store
	})

	useEffect(() => {
		// 自动 或者 params 变化了
		if (auto) fn()
	}, [auto, fn])

	return [data, count > 0, fn] as const
}