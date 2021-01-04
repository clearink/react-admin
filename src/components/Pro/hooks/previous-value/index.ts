import { useEffect, useRef } from "react"

export default function usePreviousValue<S>(value: S) {
	const previousValue = useRef<S | undefined>(undefined)
	useEffect(() => {
		previousValue.current = value
	}, [value])
	return previousValue.current
}
