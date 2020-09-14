import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"
import { INCREASE, DECREASE } from "@/store/reducers/counter"
import { Button } from "antd"
import { useDispatch } from "react-redux"

function Home(props: IBaseProps) {
	console.log("home", props)
	const dispatch = useDispatch()
	return (
		<div className='app-wrapper'>
			Home page <Link to='/login'>to login</Link>
			<Button
				type='primary'
				onClick={() => {
					dispatch(INCREASE())
				}}
			>
				test redux
			</Button>
		</div>
	)
}

export default memo(Home)
