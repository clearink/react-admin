import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"


function Login(props: IBaseProps) {
	return (
		<div className='login-page'>
			<div className='login-box-wrap'>
				<h1 className="login-box-title">欢迎登陆</h1>
				<Link to='/'>to home</Link>
			</div>
		</div>
	)
}
export default memo(Login)
