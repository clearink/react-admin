import { useCallback } from "react"
import useCounter from "../counter"
import { AsyncAction } from "../interface"
import useMemoCallback from "../memo-callback"

export default function useActionPending<A extends AsyncAction>(action: A) {
	const [count, { inc, dec }] = useCounter()
	const fn = useMemoCallback(action, [])
	const wrappedAction = useCallback(
		async (...args: any[]) => {
			try {
				inc()
				const result = await fn(...args)
				return result
			} finally {
				dec()
			}
		},
		[fn, inc, dec]
	) as A
	return [count, wrappedAction] as const
}
