import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"
import { Button } from "antd"
import { SketchPicker } from "react-color"

function Home(props: IBaseProps) {
	console.log(props)
	return (
		<div className='app-wrapper'>
			Home page
			<Link to='/login'>to login</Link>
			<Button type='primary'>test redux</Button>
			<SketchPicker />
		</div>
	)
}

export default memo(Home)
