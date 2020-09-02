import { useState, useCallback } from "react"

export default function useBoolean(init: boolean = false) {
	const [value, set] = useState(init)
	const toggle = useCallback(() => set((p) => !p), [])
	return [value, toggle]
}
