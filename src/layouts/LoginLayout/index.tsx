import React, { useEffect } from "react"
import LoginUtil from "@/utils/LoginUtil"
import { message } from "antd"
import { useHistory } from "react-router-dom"
import { IBaseProps } from "@/@types/fc"
import "./style.scss"
function LoginLayout(props: IBaseProps) {
	const { children } = props
	const { replace } = useHistory()
	const isLogin = LoginUtil.isLogin()
	// 判断是否登录
	useEffect(() => {
		if (!isLogin) return
		const timer = setTimeout(() => {
			message.info("您已经登录了,将为您导航至主页", 1.5, () => replace("/"))
		}, 300)
		return () => {
			clearTimeout(timer)
		}
	}, [isLogin, replace])

	return (
		<div className='app-login-layout'>
			{/* <ParticlesBg type='cobweb' bg /> */}
			{children}
			<footer className='app-login-footer'>
				<p>Copyright © 派博生命科技, All Rights Reserved.</p>
				<p>PEPPER LIFE TECHNOLOGY</p>
			</footer>
		</div>
	)
}

export default LoginLayout
