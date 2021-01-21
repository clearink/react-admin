import React, { useEffect, useLayoutEffect } from "react"
import { Layout } from "antd"
import { useHistory } from "react-router-dom"
import { IBaseProps } from "@/@types/fc"
import LoginUtil from "@/utils/store/LoginUtil"
import SiderMenu from "@/components/SiderMenu"
import useTypedSelector from "@/hooks/useTypedSelector"
import { actions } from "@/store/reducers/user"
import { actions as menuActions } from "@/store/reducers/menu"
import GetBoundAction from "@/utils/store/GetBoundAction"
import Footer from "@/components/Footer"
import useUnwrapAsyncThunk from "@/hooks/useUnwrapAsyncThunk"
import { formatMenuData, formatRoutesData } from "./utils"
import "./style.scss"

const { Content } = Layout
const SaveMenu = GetBoundAction(menuActions.saveMenu)
function BaseLayout(props: IBaseProps) {
	const { children, routes } = props
	const isLogin = LoginUtil.isLogin()
	const { replace } = useHistory()
	const unwrap = useUnwrapAsyncThunk()
	const { user } = useTypedSelector((state) => state.user)

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

	// // 获取菜单数据 根据 routes json
	// useEffect(() => {
	// 	SaveMenu(formatRoutesData(routes!))
	// }, [routes])

	// 请求菜单数据
	useEffect(() => {
		unwrap(menuActions.fetchMenu())
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

export default BaseLayout
