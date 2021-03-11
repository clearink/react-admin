import React, {
	createContext,
	PropsWithChildren,
	useContext,
	useReducer,
} from "react"

export interface CountProps {
	count: number
}
const CountContext = createContext<
	| {
			state: CountProps
			dispatch: React.Dispatch<{ type: string }>
	  }
	| undefined
>(undefined)

function countReducer(state: CountProps, action: { type: string }) {
	switch (action.type) {
		case "increment":
			return { count: state.count + 1 }
		case "decrement":
			return { count: state.count - 1 }
		default:
			throw new Error(`无法识别的 action type ${action.type}`)
	}
}

function CountProvider(props: PropsWithChildren<any>) {
	const [state, dispatch] = useReducer(countReducer, { count: 0 })
	const value = { state, dispatch }
	return (
		<CountContext.Provider value={value}>
			{props.children}
		</CountContext.Provider>
	)
}

function useCount() {
	const context = useContext(CountContext)
	if (context === undefined) throw new Error("Context not allow undefined")

	return context
}

export { useCount }
export default CountProvider
