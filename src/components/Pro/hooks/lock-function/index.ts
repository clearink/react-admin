import { useCallback, useRef } from "react"
import { AsyncAction } from "../interface"
import useMemoCallback from "../memo-callback"

export function useLockFunction<A extends AsyncAction>(callback: A) {
	const runRef = useRef(false)
	const fn = useMemoCallback(callback, [])
	return useCallback(
		async (...args: any[]) => {
			if (runRef.current) return
			runRef.current = true
			const result = await fn(...args)
			runRef.current = false
			return result
		},
		[fn]
	) as A
}
