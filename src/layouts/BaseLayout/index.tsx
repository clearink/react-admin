import React, { useEffect, memo, PropsWithChildren } from "react"
import { Layout } from "antd"
import LayoutHeader from "@/components/LayoutHeader"
import LoginUtil from "@/utils/LoginUtil"
import SiderMenu from "@/components/SiderMenu"
import { GithubFilled, CopyrightOutlined } from "@ant-design/icons"
import { useHistory } from "react-router-dom"
import useTypedSelector from "@/hooks/useTypedSelector"
import { actions } from "@/store/reducers/user"
import GetBoundAction from "@/utils/GetBoundAction"
import { IBaseProps } from "@/@types/fc"

const { Content, Footer } = Layout
const GetCurrentUser = GetBoundAction(actions.getCurrentUser)

function BaseLayout(props: IBaseProps) {
	const { children, routes } = props
	const isLogin = LoginUtil.isLogin()
	const { user } = useTypedSelector((state) => state.user)
	const { push } = useHistory()

	useEffect(() => {
		if (isLogin && !user) {
			// 登录了,但是没有用户信息
			console.log("登录了, 但是没有用户信息")
			const user = LoginUtil.getToken()
			GetCurrentUser({ id: user?.id })
		}
	}, [isLogin, user])

	useEffect(() => {
		if (!isLogin) {
			console.log("未登录")
			//跳转至 login
			push("/login")
		}
	}, [isLogin, push])

	console.log(routes);
	return (
		<Layout hasSider className='app-base-layout'>
			<SiderMenu menuConfig={routes} />
			<Layout className='content__layout'>
				<LayoutHeader />
				<Content className='layout-content-wrap'>{children}</Content>
				<Footer className='footer_content__wrap'>
					<div className='footer_content'>
						<span>react blog</span>
						<GithubFilled />
						<a href='https://github.com/clearink/react-blog'>github</a>
					</div>
					<div className='footer_content--copyright'>
						<span>copyright</span>
						<CopyrightOutlined />
						<span>clearink</span>
					</div>
				</Footer>
			</Layout>
		</Layout>
	)
}

export default memo(BaseLayout)
