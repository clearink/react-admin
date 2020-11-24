import React, { useEffect } from "react"
import { Tabs, Typography, Button, Spin, message } from "antd"
import IconFont from "@/components/IconFont"
import useBoolean from "@/hooks/useBoolean"
import classNames from "classnames"
import styles from "./style.module.scss"
import BaseMateriel from "./BaseMaterielList"
import FormMateriel from "./FormMaterielList"
import MediaMateriel from "./MediaMaterielList"
import useUnwrapAsyncThunk from "@/hooks/useUnwrapAsyncThunk"
import { actions } from "@/store/reducers/materiel"
import useTypedSelector from "@/hooks/useTypedSelector"
const { Title } = Typography
const { TabPane } = Tabs

// 物料
interface IProps {}
function Materiel(props: IProps) {
	const [collapsed, toggle] = useBoolean()
	const loading = useTypedSelector((state) => state.materiel.loading)

	// // 请求数据
	// const unwrap = useUnwrapAsyncThunk()
	// useEffect(() => {
	// 	unwrap(actions.fetchMateriel())
	// }, [unwrap])
	return (
		<>
			<div
				className={classNames(styles.container, {
					[styles.collapsed]: collapsed,
				})}
			>
				<Spin spinning={loading}>
					<Tabs tabPosition='left' className={styles.tab__list}>
						<TabPane tab={<IconFont type='icon-menu' />} key='base'>
							<Title level={4}>基础组件</Title>
							<BaseMateriel />
						</TabPane>
						<TabPane tab={<IconFont type='icon-control' />} key='form'>
							<Title level={4}>高级组件</Title>
							<FormMateriel />
						</TabPane>
						<TabPane tab={<IconFont type='icon-menu' />} key='media'>
							<Title level={4}>媒体组件</Title>
							<MediaMateriel />
						</TabPane>
					</Tabs>
				</Spin>
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
