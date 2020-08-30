import React, { useEffect, memo, ReactNode } from "react"
import { Layout, Button } from "antd"
import LayoutHeader from "@/components/LayoutHeader"
import { useSelector } from "react-redux"
import { StoreState } from "@/stores"
import actions from "@/stores/actions"

const { Header, Sider, Content, Footer } = Layout

interface IProps {
	children?: ReactNode
}
function BaseLayout(props: IProps) {
	const { children } = props
	const { login, user } = useSelector((state: StoreState) => state.user)
	useEffect(() => {
		console.log("baseLayout 挂载")
		if (login && !user) {
			// 登录了,但是没有用户信息
			actions.GetUserInfo()
		}
	}, [login, user])

	return (
		<Layout hasSider className='app-base-layout'>
			<Sider collapsible>menu</Sider>
			<Layout>
				<Header className='layout-header'>
					<LayoutHeader />
				</Header>
				<Content className='layout-content-wrap'>{children}</Content>
				<Footer>footer</Footer>
			</Layout>
		</Layout>
	)
}

export default memo(BaseLayout)
