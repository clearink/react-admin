import { dequal } from "dequal"
import { DependencyList, useRef } from "react"
// 只有 两次的deps不同才更新
export default function useDeepMemo<T>(
	callback: () => T,
	deps?: DependencyList
): T {
	const preDeps = useRef<any>(null) // pre deps
	const preState = useRef<any>(null) // pre state

	if (dequal(preDeps.current, deps)) return preState.current

	preDeps.current = deps
	preState.current = callback()
	return preState.current
}
