import { DependencyList, useEffect, useRef } from "react"
import useMemoCallback from "../memo-callback"

// 追踪effect 依赖变化
export type useTrackedEffectCallback = (
	changes: Array<number>,
	PrevDeps: DependencyList,
	NowDeps: DependencyList
) => void | (() => void | undefined)

export default function useTrackedEffect(
	callback: useTrackedEffectCallback,
	deps: DependencyList
) {
	const fn = useMemoCallback(callback, [])

	const previous = useRef<DependencyList>([])
	useEffect(() => {
		// 比较 deps是否不一致 然后调用 callback
		const diffArray: Array<number> = []
		deps.forEach((item, index) => {
			if (previous.current![index] !== item) diffArray.push(index)
		})
		const previousDeps = previous.current
		previous.current = deps
		return fn(diffArray, previousDeps, deps)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps, fn])
	// 暂缓拿到的previous
}
