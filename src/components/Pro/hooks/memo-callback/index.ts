import { DependencyList, useCallback, useRef } from "react"

/** 返回的永远是同一个引用 */

export type AnyFunc = (...args: any[]) => any
export type VoidFunc = () => void
export default function useMemoCallback<F extends AnyFunc>(
	callback: F,
	deps?: DependencyList
) {
	const fn = useRef(callback)
	fn.current = callback
	return useCallback(function (this: unknown, ...args: any[]) {
		return fn.current.apply(this, args)
	}, []) as F
}
