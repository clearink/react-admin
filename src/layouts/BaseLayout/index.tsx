import React, { useEffect, memo, ReactNode } from "react"
import { Layout, Button } from "antd"

const { Header, Sider, Content, Footer } = Layout

interface IProps {
	children?: ReactNode
}
function BaseLayout(props: IProps) {
	const { children } = props
	useEffect(() => {
		console.log("baseLayout 挂载")
	}, [])
	return (
		<Layout hasSider className='app-base-layout'>
			<Sider collapsible>menu</Sider>
			<Layout>
				<Header className='layout-header'>header</Header>
				<Content className='layout-content-wrap'>{children}</Content>
				<Footer>footer</Footer>
			</Layout>
		</Layout>
	)
}

export default memo(BaseLayout)
