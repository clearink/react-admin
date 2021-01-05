import { DependencyList, useRef } from "react"
import useDeepEqual from "../deep-equal"
export default function useDeepMemo<T>(
	factory: () => T,
	deps: DependencyList | undefined
): T {
	// 比较两次的deps是否相等
	const depsEqual = useDeepEqual(deps)
	const ref = useRef<T>(factory())
	if (!depsEqual) ref.current = factory()
	return ref.current
}
