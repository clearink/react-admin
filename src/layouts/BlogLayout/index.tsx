import React, { memo, PropsWithChildren } from "react"
import BlogHeader from "@/components/Blog/BlogHeader"
import { Layout } from "antd"
import "./style.scss"
const { Header, Content, Footer } = Layout

interface IProps {}

function BlogLayout(props: PropsWithChildren<IProps>) {
	return (
		<Layout className='blog_layout__wrap flex flex-col min-h-screen'>
			<Header className='blog__header bg-white px-6 fixed z-10 left-0 right-0'>
				<BlogHeader />
			</Header>
			<Content className='blog__content flex-auto  px-12 py-8 pt-32'>
				{props.children}
			</Content>
			<Footer className='text-center'>CopyRight @ ClearInk</Footer>
		</Layout>
	)
}

export default memo(BlogLayout)
