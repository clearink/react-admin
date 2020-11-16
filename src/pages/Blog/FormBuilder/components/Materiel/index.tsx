import React from "react"
import { Tabs, Typography, Button } from "antd"
import IconFont from "@/components/IconFont"
import useBoolean from "@/hooks/useBoolean"
import classNames from "classnames"
import styles from "./style.module.scss"
import BaseComponent from "./BaseComponent"
import FormComponent from "./FormComponent"
import MediaComponent from "./MediaComponent"
const { Title } = Typography
const { TabPane } = Tabs
// 缩略宽度
interface IProps {}
function Materiel(props: IProps) {
	const [collapsed, toggle] = useBoolean()
	return (
		<>
			<div
				className={classNames(styles.container, {
					[styles.collapsed]: collapsed,
				})}
			>
				<Tabs tabPosition='left' className={styles.tab__list}>
					{/* 基础组件 */}
					<TabPane tab={<IconFont type='icon-menu' />} key='base'>
						<Title level={4}>基础组件</Title>
						<BaseComponent />
					</TabPane>
					{/* 表单组件 */}
					<TabPane tab={<IconFont type='icon-control' />} key='form'>
						<Title level={4}>表单组件</Title>
						<FormComponent />
					</TabPane>
					{/* 媒体组件 */}
					<TabPane tab={<IconFont type='icon-menu' />} key='media'>
						<Title level={4}>媒体组件</Title>
						<MediaComponent />
					</TabPane>
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
			>
				placeholder
			</div>
		</>
	)
}

export default Materiel
