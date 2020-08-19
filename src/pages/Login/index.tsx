import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"

function Login(props: IBaseProps) {
	return (
		<div>
			Login
			<Link to='/'>to home</Link>
		</div>
	)
}
export default memo(Login)
