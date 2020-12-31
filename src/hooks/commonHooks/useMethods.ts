import { useMemo, useState } from "react"

export default function useMethods<V = any, M = {}>(
	initialValue: V,
	methods: M
) {
	const [value, setValue] = useState(() => initialValue)
	const boundMethods = useMemo(() => {
		return Object.entries(methods).reduce((pre, [name, fn]) => {
			pre[name] = (...args: any[]) => setValue((value) => fn(value, ...args))
			return pre
		}, {})
	}, [methods])
	return [value, boundMethods]
}
