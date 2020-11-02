import React from "react"
import { Tabs, Layout, Typography, Button } from "antd"
import IconFont from "@/components/IconFont"
import useBoolean from "@/hooks/useBoolean"
import classNames from "classnames"
import styles from "./style.module.scss"
const { Sider } = Layout
const { Title } = Typography

// 缩略宽度
const collapsedWidth = 50
interface IProps {}
function Materiel(props: IProps) {
	const [collapsed, toggle] = useBoolean()
	return (
		<>
			<div
				className={classNames(styles.container, {
					[styles.collapsed]: collapsed,
				})}
				// theme='light'
				// width='30rem'
				// breakpoint='md'
				// collapsed={collapsed}
				// collapsedWidth={collapsedWidth}
				// collapsible
				// onCollapse={console.log}
				// trigger={null}
			>
				<Tabs tabPosition='left' className={styles.tab__list}>
					{Array.from({ length: 3 }, (_, i) => (
						<Tabs.TabPane tab={i} key={i}>
							{/*  <Tabs.TabPane tab={<IconFont type='icon-control' />} key={i}> */}
							<div className={styles.wrap}>
								<Title level={5} className={styles.title}>
									基础组件===={i}
								</Title>
								<div className={styles.list__item}>
									{Array.from({ length: 30 }, (_, i) => (
										<div key={i}>{i}</div>
									))}
								</div>
							</div>
						</Tabs.TabPane>
					))}
				</Tabs>
				<Button
					className={styles.collapsed}
					type='link'
					onClick={toggle as any}
				>
					<IconFont type='icon-menu' />
				</Button>
			</div>
			<div
				className={classNames(styles.placeholder, {
					[styles.collapsed]: collapsed,
				})}
			>placeholder</div>
		</>
	)
}

export default Materiel
