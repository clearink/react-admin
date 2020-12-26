import { AnyAction } from "@reduxjs/toolkit"
import { createContext } from "react"
import { initialState } from "./reducer"

export default createContext<{
	state: typeof initialState
	dispatch: null | React.Dispatch<AnyAction>
}>({ state: initialState, dispatch: null })
