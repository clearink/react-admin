import { useMemo } from "react"
import useTypedSelector from "./useTypedSelector"

/**
 * 用 reSelector 包裹 redux selector 优化性能
 * 传入一个 ()=selector 函数与额外的props
 */
export default function useCacheSelector<R extends (...args: any[]) => any, P>(
	selector: () => R,
	props?: P
): ReturnType<R> {
	const memoSelector = useMemo<R>(selector, [])
	return useTypedSelector((state) => memoSelector(state, props))
}
