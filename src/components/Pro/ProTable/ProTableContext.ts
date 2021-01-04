import { createContext } from "react"
import { Methods } from "../hooks/methods/interface"
import { initialState, reducers } from "./useTableFetch"

export default createContext<{
	state: typeof initialState
	methods?: Methods<typeof reducers, typeof initialState>
}>({ state: initialState })
