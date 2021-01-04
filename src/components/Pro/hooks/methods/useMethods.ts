import { useState } from "react"
import { ExtensionReducer } from "./interface"
import useExtensionReducer from "./useExtensionReducer"



export default function useMethods<R extends ExtensionReducer<S>, S>(
	reducers: R,
	initialValue: S | (() => S)
) {
	const [state, setState] = useState(initialValue)
	const methods = useExtensionReducer(reducers, setState)
	return [state, methods, setState] as const
}
