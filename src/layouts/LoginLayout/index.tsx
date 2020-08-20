import React, { ReactNode, useEffect } from "react"

interface IProps {
	children: ReactNode
}
function LoginLayout(props: IProps) {
	const { children } = props
	useEffect(()=>{
		console.log('login layout 挂载');
	},[])
	return <div className='app-login-layout'>{children}</div>
}

export default LoginLayout
