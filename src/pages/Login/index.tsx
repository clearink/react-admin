import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"
import "./style.less"

function Login(props: IBaseProps) {
	return (
		<div className='login-page'>
			<div className='login-box-wrap'>
				Login
				<Link to='/'>to home</Link>
			</div>
		</div>
	)
}
export default memo(Login)
