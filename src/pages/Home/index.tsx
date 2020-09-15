import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"
import { INCREASE, DECREASE } from "@/store/reducers/counter"
import { Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/store"

function Home(props: IBaseProps) {
	const count = useSelector((state: AppState) => state.counter.count)
	const dispatch = useDispatch()
	return (
		<div className='app-wrapper'>
			Home page <Link to='/login'>to login</Link>
			<Button
				type='primary'
				onClick={() => {
					dispatch(INCREASE(2))
				}}
			>
				test redux-----{count}
			</Button>
		</div>
	)
}

export default memo(Home)
