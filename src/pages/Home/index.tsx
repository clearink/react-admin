import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"
import { Button } from "antd"

function Home(props: IBaseProps) {
	console.log("home", props)
	return (
		<div className='app-wrapper'>
			Home page <Link to='/login'>to login</Link>
			<Button type='primary'>test redux</Button>
		</div>
	)
}

export default memo(Home)
