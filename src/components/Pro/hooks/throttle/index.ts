import { DependencyList, EffectCallback, useEffect, useState } from "react"
import useMemoCallback, { AnyFunc } from "../memo-callback"
import throttle, { ThrottleOptions } from "./throttle"

export function useThrottledCallback<T extends AnyFunc>(
	callback: T,
	options: ThrottleOptions
) {
	return useMemoCallback(
		throttle((...args: any[]) => {
			return callback(...args)
		}, options),
		[]
	) as T
}
// 防抖 effect
export function useThrottledEffect(
	callback: EffectCallback,
	deps: DependencyList,
	options: ThrottleOptions
) {
	const fn = useThrottledCallback(callback, options)
	useEffect(() => {
		fn()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fn, ...deps])
}

export function useThrottledValue<S>(value: S, options: ThrottleOptions) {
	const [state, setState] = useState(value)
	useThrottledEffect(
		() => {
			setState(value)
		},
		[value],
		options
	)

	return state
}
