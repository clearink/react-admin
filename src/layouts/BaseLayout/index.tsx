import React, { useEffect, memo, PropsWithChildren } from "react"
import { Layout, Button, message } from "antd"
import LayoutHeader from "@/components/LayoutHeader"
import { useSelector } from "react-redux"
import { StoreState } from "@/stores"
import actions from "@/stores/actions"
import LoginUtil from "@/utils/LoginUtil"
import SiderMenu from "@/components/SiderMenu"
import { GithubFilled, CopyrightOutlined } from "@ant-design/icons"

const { Header, Sider, Content, Footer } = Layout

interface IProps {}
function BaseLayout(props: PropsWithChildren<IProps>) {
	const { children } = props
	const { user } = useSelector((state: StoreState) => state.user)
	const isLogin = LoginUtil.isLogin()

	useEffect(() => {
		if (isLogin && !user) {
			// 登录了,但是没有用户信息
			actions.GetUserInfo()
		}
	}, [isLogin, user])

	useEffect(() => {
		if (!isLogin) {
			console.log("未登录")
			//跳转至 login push('/login')
		}
	}, [isLogin])

	return (
		<Layout hasSider className='app-base-layout'>
			<SiderMenu />
			<Layout>
				<Header className='layout-header'>
					<LayoutHeader />
				</Header>
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
