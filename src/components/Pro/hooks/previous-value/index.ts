import { useEffect, useRef } from "react"

export default function usePreviousValue<S>(value: S) {
	const previousValue = useRef<S | null>(null)
	useEffect(() => {
		previousValue.current = value
	}, [value])
	return previousValue.current
}
