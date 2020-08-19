import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"

function Home(props: IBaseProps) {
	return (
		<div className='app-wrapper'>
			Home page
			<Link to='/login'>to login</Link>
		</div>
	)
}

export default memo(Home)
