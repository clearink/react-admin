import React, { useEffect, memo, useLayoutEffect } from "react"
import { IBaseProps } from "@/@types/fc"
import { Layout } from "antd"
import LoginUtil from "@/utils/store/LoginUtil"
import SiderMenu from "@/components/SiderMenu"
import useTypedSelector from "@/hooks/useTypedSelector"
import { actions } from "@/store/reducers/user"
import { actions as menuActions } from "@/store/reducers/menu"
import GetBoundAction from "@/utils/store/GetBoundAction"
import { IRoute } from "@/@types/route"
import { TMenu } from "@/@types/menu"
import FilterValue from "@/utils/data/FilterValue"
import Footer from "@/components/Footer"
import "./style.scss"
import useUnwrapAsyncThunk from "@/hooks/useUnwrapAsyncThunk"
import { useHistory } from "react-router-dom"

const { Content } = Layout
const SaveMenu = GetBoundAction(menuActions.saveMenu)
function BaseLayout(props: IBaseProps) {
	const { children, routes } = props
	const isLogin = LoginUtil.isLogin()
	const { replace } = useHistory()
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
		if (!isLogin) replace("/login")
	}, [isLogin, replace])

	// 获取菜单数据
	useEffect(() => {
		function filterMenu(
			routes: IRoute[],
			parentKeys: string = "root"
		): TMenu[] {
			if (!Array.isArray(routes)) throw new Error("routes must array")
			return routes.map((route) => {
				// 确保 menu key 全局唯一
				const key = `${parentKeys}😜${route.key ?? route.path}`
				return {
					...FilterValue(route, ["component", "wrap"]),
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
			// console.log(result)
		})()
	}, [unwrap])

	return (
		<Layout className={"app-base-layout"}>
			<SiderMenu />
			<Layout className='content__layout'>
				{/* <LayoutHeader /> */}
				<Content className='content-wrap'>{children}</Content>
				<Footer />
			</Layout>
		</Layout>
	)
}

export default memo(BaseLayout)
