import { useEffect } from "react"
import { useRef } from "react"
export default function usePrevious<T>(value: T): T {
	const ref = useRef<any>()
	useEffect(() => {
		ref.current = value
	})
	return ref.current as T
}
