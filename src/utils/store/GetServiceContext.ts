import React from "react"

export default function GetServiceContext<T>(
	useHook: (...args: any[]) => T,
	defaultValue?: T
) {
	return React.createContext(defaultValue as T)
}
