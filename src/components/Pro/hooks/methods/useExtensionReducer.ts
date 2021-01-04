import { Dispatch, SetStateAction, useRef } from "react"
import { ExtensionReducer, Methods } from "./interface"
export default function useExtensionReducer<R extends ExtensionReducer<S>, S>(
	reducers: R,
	setState: Dispatch<SetStateAction<S>>
) {
	const methodsRef = useRef<Methods<R, S> | undefined>(undefined)
	if (!methodsRef.current) {
		methodsRef.current = Object.keys(reducers).reduce((methods, key) => {
			const fn = reducers[key]
			const bound = (...args: any[]) => setState((s) => fn(s, ...args))
			Object.assign(methods, { [key]: bound })
			return methods
		}, {} as Methods<R, S>)
	}
	return methodsRef.current
}
