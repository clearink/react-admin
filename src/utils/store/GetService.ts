import { createContext } from "react"
export default function GetService<T>(useHook: (...args: any[]) => T) {
	return createContext<T | undefined>(undefined)
}
