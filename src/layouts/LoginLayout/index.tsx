import React from "react"
import { IBaseProps } from "@/@types/fc"

function LoginLayout(props: IBaseProps) {
	const { children } = props
	console.log(children);
	return <div className='app-login-layout'>Login Layout</div>
}

export default LoginLayout
