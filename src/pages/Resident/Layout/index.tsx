import React, { PropsWithChildren } from "react"
import { Tabs } from "antd"
import { CommonHeader } from "@/components/PepLife"
import { BankOutlined } from "@ant-design/icons"
import styles from "./style.module.scss"
import { IBaseProps } from "@/@types/fc"
import { useHistory } from "react-router-dom"

// 住户管理 layout
function MonitorLayout(props: PropsWithChildren<IBaseProps>) {
	const { children, location } = props
	const { push } = useHistory()
	return (
		<div className={styles.page_wrap}>
			<CommonHeader icon={<BankOutlined />} title='住户管理' fixed>
				<Tabs
					className={styles.navbar}
					size='large'
					activeKey={location.pathname}
					onTabClick={(path) => push(path)}
				/>
			</CommonHeader>
			<main className={styles.content_wrap}>{children}</main>
		</div>
	)
}

export default MonitorLayout
