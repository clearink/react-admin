import { Layout } from "antd"
import React, { memo, ReactNode } from "react"

const { Header, Content, Footer } = Layout

interface IProps {
	children: ReactNode
}

function BlogLayout(props: IProps) {
	return (
		<Layout className='blog_layout__wrap flex flex-col min-h-screen'>
			<Header className='blog__header bg-white'>123123</Header>
			<Content className='blog__content flex-auto  px-12 py-8'>{props.children}</Content>
			<Footer className="text-center">12312</Footer>
		</Layout>
	)
}

export default memo(BlogLayout)
