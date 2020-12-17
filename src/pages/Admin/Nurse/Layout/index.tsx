import React, { PropsWithChildren } from "react"
import { Tabs } from "antd"
import { CommonHeader } from "@/components/PepLife"
import { BankOutlined } from "@ant-design/icons"
import styles from "./style.module.scss"
import { IBaseProps } from "@/@types/fc"
import { useHistory } from "react-router-dom"

// 护管管理 layout
function Layout(props: PropsWithChildren<IBaseProps>) {
	const { children, location } = props
	const { push } = useHistory()
	return (
		<div className={styles.page_wrap}>
			<CommonHeader icon={<BankOutlined />} title='护管管理' fixed>
				<Tabs
					className={styles.navbar}
					size='large'
					activeKey={location.pathname}
					onTabClick={(path) => push(path)}
				>
					<Tabs.TabPane tab='护管列表' key='/nurse'></Tabs.TabPane>
					<Tabs.TabPane tab='护理设置' key='/nurse/setting'></Tabs.TabPane>
				</Tabs>
			</CommonHeader>
			<main className={styles.content_wrap}>{children}</main>
		</div>
	)
}

export default Layout
