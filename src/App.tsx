import React from "react"
import { Button } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { counterIncAction } from "./stores/actions"
function App() {
	const state = useSelector((state: IState<CounterState>) => state.counter)
	const dispatch = useDispatch()
	const handleIncrease = () => {
		dispatch(counterIncAction())
	}
	return (
		<div className='App'>
			<Button type='primary' onClick={handleIncrease}>
				{state.count}
			</Button>
		</div>
	)
}

export default App
