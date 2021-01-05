import React, { PropsWithChildren } from "react"
import { Tabs } from "antd"
import { CommonHeader } from "@/components/PepLife"
import { BankOutlined } from "@ant-design/icons"
import styles from "./style.module.scss"
import { IBaseProps } from "@/@types/fc"
import { useHistory } from "react-router-dom"

// 监控分析 layout
function MonitorLayout(props: PropsWithChildren<IBaseProps>) {
	const { children, location } = props
	const { push } = useHistory()
	return (
		<div className={styles.page_wrap}>
			<CommonHeader icon={<BankOutlined />} title='监控分析' fixed>
				<Tabs
					className={styles.navbar}
					size='large'
					activeKey={location.pathname}
					onTabClick={(path) => push(path)}
				>
					<Tabs.TabPane tab='床位监控' key='/monitor'></Tabs.TabPane>
					<Tabs.TabPane tab='告警记录' key='/monitor/alarm'></Tabs.TabPane>
					<Tabs.TabPane tab='统计分析' key='/monitor/analysis'></Tabs.TabPane>
				</Tabs>
			</CommonHeader>
			<main className={styles.content_wrap}>{children}</main>
		</div>
	)
}

export default MonitorLayout
