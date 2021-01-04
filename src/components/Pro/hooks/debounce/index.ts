import { DependencyList, EffectCallback, useEffect, useState } from "react"
import useMemoCallback, { AnyFunc } from "../memo-callback"
import debounce, { DebounceOptions } from "./debounce"

export function useDebouncedCallback<T extends AnyFunc>(
	callback: T,
	options: DebounceOptions
) {
	return useMemoCallback(
		debounce((...args: any[]) => {
			return callback(...args)
		}, options),
		[]
	) as T
}
// 防抖 effect
export function useDebouncedEffect(
	callback: EffectCallback,
	deps: DependencyList,
	options: DebounceOptions
) {
	const fn = useDebouncedCallback(callback, options)
	useEffect(() => {
		fn()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fn, ...deps])
}

export function useDebouncedValue<S>(value: S, options: DebounceOptions) {
	const [state, setState] = useState(value)
	useDebouncedEffect(
		() => {
			setState(value)
		},
		[value],
		options
	)

	return state
}
