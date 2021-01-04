import useMethods from "../methods/useMethods"

const reducers = {
	inc: (state: number) => state + 1,
	dec: (state: number) => state - 1,
	step: (state: number, step: number = 1) => state + step,
}
export default function useCounter(initialValue: number = 0) {
	return useMethods(reducers, initialValue)
}
