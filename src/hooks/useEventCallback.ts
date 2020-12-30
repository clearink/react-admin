import { DependencyList, useCallback, useEffect, useRef } from "react"
export default function useEventCallback<T extends (...args: any[]) => any>(
	fn: T,
	dependencies: DependencyList
) {
	const ref = useRef<any>(() => {
		throw new Error("is rendering")
	})
	useEffect(() => {
		ref.current = fn
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fn, ...dependencies])

	return useCallback<any>((...args: any[]) => ref.current(...args), [ref])
}
