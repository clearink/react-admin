/*
 * @Description:  用 reSelector 包裹 redux selector 优化性能
 传入一个 ()=selector 函数与额外的props
 * @Author: clearink
 * @Date: 2020-10-19 10:18:43
 * @LastEditors: clearink
 * @LastEditTime: 2020-10-19 10:22:56
 */
import { useMemo } from "react"
import useTypedSelector from "./useTypedSelector"

export default function useCacheSelector<S extends (...args: any[]) => any, P>(
	selector: () => S,
	props?: P
): ReturnType<S> {
	const memoSelector = useMemo<S>(selector, [])
	return useTypedSelector((state) => memoSelector(state, props))
}
