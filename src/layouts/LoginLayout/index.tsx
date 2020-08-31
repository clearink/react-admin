import React, { ReactNode, useEffect } from "react"
import ParticlesBg from "particles-bg"
import LoginUtil from "@/utils/LoginUtil"
import { message } from "antd"
import { useHistory } from "react-router-dom"
interface IProps {
	children: ReactNode
}
function LoginLayout(props: IProps) {
	const { children } = props
	const { replace } = useHistory()
	const isLogin = LoginUtil.isLogin()
	// 判断是否登录
	useEffect(() => {
		if (!isLogin) return
		const timer = setTimeout(() => {
			message.info("您已经登录了,将为您导航至主页", 1.5, () => replace("/"))
		}, 600)
		return () => {
			clearTimeout(timer)
		}
	}, [isLogin, replace])

	return (
		<div className='app-login-layout'>
			<ParticlesBg type='cobweb' bg />
			{children}
		</div>
	)
}

export default LoginLayout
