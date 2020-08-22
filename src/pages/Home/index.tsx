import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"
import { Button } from "antd"
import BoundAction from "@/utils/BoundAction"
import { counterIncAction } from "@/stores/actions"

function Home(props: IBaseProps) {
	const count = BoundAction(counterIncAction)
	return (
		<div className='app-wrapper'>
			Home page
			<Link to='/login'>to login</Link>
			<Button
				type='primary'
				onClick={() => {
					count()
				}}
			>
				test redux
			</Button>
		</div>
	)
}

export default memo(Home)
