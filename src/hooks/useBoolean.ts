import { useState, useCallback } from "react"

export default function useBoolean(init: boolean = false): [boolean, Function] {
	const [value, set] = useState(init)
	const toggle = useCallback(() => set((p: boolean) => !p), [])
	return [value, toggle]
}
