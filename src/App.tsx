import React from "react"
import { Button } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { counterIncAction } from "@/stores/actions"
import BoundAction from "@/utils/BoundAction"
function App() {
	const state = useSelector((state: IState<CounterState>) => state.counter)
	const dispatch = useDispatch()
	const inc = BoundAction(counterIncAction)
	return (
		<div className='App'>
			<Button type='primary' onClick={inc}>
				{state.count}
			</Button>
		</div>
	)
}

export default App
