// action
interface ActionProp<T = any> {
	type: string
	payload: T
}
// redux 中的数据
interface IState<T = any> {
	counter: T
}

interface CounterState {
	count: number
}
