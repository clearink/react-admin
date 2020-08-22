import React, { ReactNode, useEffect } from "react"
import ParticlesBg from "particles-bg"
interface IProps {
	children: ReactNode
}
function LoginLayout(props: IProps) {
	const { children } = props
	useEffect(() => {
		console.log("login layout 挂载")
	}, [])
	return (
		<div className='app-login-layout'>
			<ParticlesBg type='cobweb' bg/>
			{children}
		</div>
	)
}

export default LoginLayout
