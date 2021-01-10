import { DependencyList, EffectCallback, useEffect, useRef } from "react"
// 仅仅对 fn 的更改不敏感
export default function useEventEffect(
	fn: EffectCallback,
	dependencies: DependencyList
) {
	const ref = useRef<any>(() => {
		throw new Error("is rendering")
	})

	useEffect(() => {
		ref.current = fn
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fn, ...dependencies])

	useEffect(() => {
		return ref.current()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies)
}
