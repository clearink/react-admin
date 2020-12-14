import React, { useEffect, memo, useLayoutEffect } from "react"
import { IBaseProps } from "@/@types/fc"
import { Layout } from "antd"
import LayoutHeader from "@/components/LayoutHeader"
import LoginUtil from "@/utils/LoginUtil"
import SiderMenu from "@/components/SiderMenu"
import { CopyrightOutlined } from "@ant-design/icons"
import useTypedSelector from "@/hooks/useTypedSelector"
import { actions } from "@/store/reducers/user"
import { actions as menuActions } from "@/store/reducers/menu"
import GetBoundAction from "@/utils/GetBoundAction"
import { IRoute } from "@/@types/route"
import { TMenu } from "@/@types/menu"
import FilterValue from "@/utils/FilterValue"
import "./style.scss"
import useUnwrapAsyncThunk from "@/hooks/useUnwrapAsyncThunk"

const { Content, Footer } = Layout
const SaveMenu = GetBoundAction(menuActions.saveMenu)

function BaseLayout(props: IBaseProps) {
	const {
		children,
		routes,
		history: { push },
	} = props
	const isLogin = LoginUtil.isLogin()
	const unwrap = useUnwrapAsyncThunk()
	const { user } = useTypedSelector((state) => state.user)
	const { menu } = useTypedSelector((state) => state.menu)

	// 登录了,但是没有用户信息
	useLayoutEffect(() => {
		if (isLogin && !user) {
			console.log("登录了, 但是没有用户信息")
			unwrap(actions.getCurrentUser())
		}
	}, [isLogin, user, unwrap])

	// 未登录
	useLayoutEffect(() => {
		if (!isLogin) push("/login")
	}, [isLogin, push])

	// 获取菜单数据
	useEffect(() => {
		function filterMenu(
			routes: IRoute[],
			parentKeys: string = "root"
		): TMenu[] {
			if (!Array.isArray(routes)) throw new Error("routes must array")
			return routes.map((route) => {
				// 确保 menu key 全局唯一
				const key = `${parentKeys}😜${route.path ?? route.key}`
				return {
					...FilterValue(route, "component", "wrap"),
					key,
					routes: route.routes && filterMenu(route.routes, key),
				}
			})
		}
		if (routes && menu.length === 0) SaveMenu(filterMenu(routes))
	}, [routes, menu])

	// 请求菜单数据
	useEffect(() => {
		;(async () => {
			const result = await unwrap(menuActions.fetchMenu())
			console.log(result)
		})()
	}, [unwrap])
	return (
		<Layout className='app-base-layout'>
			<SiderMenu />
			<Layout className='content__layout'>
				<LayoutHeader />
				<Content className='content-wrap'>{children}</Content>
				<Footer className='footer_content__wrap'>
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
