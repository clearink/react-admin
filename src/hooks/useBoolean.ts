import { useState, useCallback, Dispatch, SetStateAction } from "react"

export default function useBoolean(
	init: boolean = false
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
	const [value, set] = useState(init)
	const toggle = useCallback(() => set((p: boolean) => !p), [])
	return [value, toggle, set]
}
