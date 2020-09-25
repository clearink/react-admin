import React, { useEffect, memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Layout } from "antd"
import LayoutHeader from "@/components/LayoutHeader"
import LoginUtil from "@/utils/LoginUtil"
import SiderMenu from "@/components/SiderMenu"
import { GithubFilled, CopyrightOutlined } from "@ant-design/icons"
import { useHistory } from "react-router-dom"
import useTypedSelector from "@/hooks/useTypedSelector"
import { actions } from "@/store/reducers/user"
import { actions as menuActions } from "@/store/reducers/menu"
import GetBoundAction from "@/utils/GetBoundAction"
import { IRoute } from "@/@types/route"

const { Content, Footer } = Layout
const GetCurrentUser = GetBoundAction(actions.getCurrentUser)
const SaveMenu = GetBoundAction(menuActions.saveMenu)

function BaseLayout(props: IBaseProps) {
	const { children, routes } = props
	const isLogin = LoginUtil.isLogin()
	const { user } = useTypedSelector((state) => state.user)
	const menu = useTypedSelector((state) => state.menu)
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
			push("/login")
		}
	}, [isLogin, push])

	useEffect(() => {
		function filterMenu(routes: IRoute[]): TMenu[] {
			return routes.map((route) => {
				return {
					path: route.path,
					title: route.title,
					icon: route.icon,
					key: route.key,
					routes: route.routes && filterMenu(route.routes),
				}
			})
		}
		if (routes && menu.length === 0) SaveMenu(filterMenu(routes))
	}, [routes, menu])
	return (
		<Layout className='app-base-layout'>
			<SiderMenu />
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
