import { DependencyList, EffectCallback, useEffect, useRef } from "react"
//  function useEffect(effect: EffectCallback, deps?: DependencyList): void;
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
		ref.current()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies)
}
