import React from "react"
import { Button } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { counterIncAction } from "./stores/actions"
function App() {
	const state = useSelector((state: IState<CounterState>) => state.counter)
	const dispatch = useDispatch()
	const handleIncrease = () => {
		dispatch(counterIncAction())
	}

	const a = bindActionCreators({ inc: counterIncAction }, dispatch)
	return (
		<div className='App'>
			<Button
				type='primary'
				onClick={() => {
					a.inc(1, 2, 3, 4)
				}}
			>
				{state.count}
			</Button>
		</div>
	)
}

export default App
