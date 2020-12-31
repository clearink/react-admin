import http from "@/http"
import { useEffect, useMemo, useRef, useState } from "react"
import useEventEffect from "../useEventEffect"
import useAsync from "./useAsync"
import useDeepEqual from "./useDeepEqual"

/**
 * 封装 pro table 数据请求 hooks 函数
 * 保存的数据有
 * 1. data
 * 2. params
 * 3. current
 * 4. pageSize
 * 5. total
 */
export default function useTableFetch(
	url: string | undefined,
	params = {},
	method: "get" | "post" | "put" | "delete" = "get"
): [any, boolean, () => void] {
	const [loading, fetchData] = useAsync(() => {
		if (!url) return
		return http[method as any](url, params)
	})
	const data = useRef(null)

	// 比较 params 两次值的不同
	const isEqual = useDeepEqual(params)
	useEventEffect(() => {
		// params 改变重新请求数据 params 相等 不请求
		if (isEqual) return
		;(async () => {
			const result = await fetchData()
			if (result) data.current = result.data
		})()
	}, [isEqual])
	return [data.current, loading, fetchData]
}
