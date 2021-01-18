import { DependencyList, useCallback, useEffect, useRef } from "react"

/** 返回的永远是同一个引用 */

export type AnyFunc = (...args: any[]) => any
export type VoidFunc = () => void
export default function useMemoCallback<F extends AnyFunc>(
	callback: F,
	deps: DependencyList
) {
	const fn = useRef<F | VoidFunc>(() => {
		throw new Error("is rending")
	})
	useEffect(() => {
		fn.current = callback
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callback, ...deps])
	return useCallback(function (this: unknown, ...args: any) {
		return fn.current.apply(this, args)
	}, []) as F
}
