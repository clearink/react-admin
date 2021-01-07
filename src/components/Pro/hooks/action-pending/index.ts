import { useCallback } from "react"
import useCounter from "../counter"
import { AsyncAction } from "../interface"
import useMemoCallback from "../memo-callback"
import useMountedRef from "../mounted-ref"

export default function useActionPending<A extends AsyncAction>(action: A) {
	const [count, { inc, dec }] = useCounter()
	const fn = useMemoCallback(action, [])
	const mountedRef = useMountedRef()
	const wrappedAction = useCallback(
		async (...args: any[]) => {
			try {
				inc()
				const result = await fn(...args)
				return result
			} finally {
				if (mountedRef.current) dec()
			}
		},
		[inc, fn, mountedRef, dec]
	) as A
	return [count, wrappedAction] as const
}
