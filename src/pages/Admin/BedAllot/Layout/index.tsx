import React, { PropsWithChildren, useMemo } from "react"
import { Button, Card, Space, Spin, Tabs, Tree } from "antd"
import { CommonHeader } from "@/components/PepLife"
import { BankOutlined, UserOutlined } from "@ant-design/icons"
import styles from "./style.module.scss"
import { IBaseProps } from "@/@types/fc"
import { useHistory } from "react-router-dom"
import useFetchData from "@/hooks/useFetchData"
import { isArray } from "@/utils/validate"
import { DataNode } from "antd/lib/tree"
import TreeTitleWrapper from "../components/TreeTitleWrapper"
import { convertTreeNode } from "../utils"
import ModalForm from "@/components/Pro/ProForm/components/ModalForm"
import { ProFormText } from "@/components/Pro/ProForm"

// 监控分析 layout
function MonitorLayout(props: PropsWithChildren<IBaseProps>) {
	const { children, location } = props
	const { push } = useHistory()

	const { data, loading, error } = useFetchData({
		url: "/orgmgt/building/treeList",
		params: {},
		method: "post",
		auto: true,
	})
	const treeData = useMemo(() => {
		if (!data) return []
		return convertTreeNode(data?.result, "orgBuildings")
	}, [data])
	return (
		<div className={styles.page_wrap}>
			<CommonHeader icon={<BankOutlined />} title='床位分配' fixed>
				<Tabs
					className={styles.navbar}
					size='large'
					activeKey={location.pathname}
					onTabClick={(path) => push(path)}
				>
					<Tabs.TabPane tab='床位管理' key='/bedallot'></Tabs.TabPane>
					<Tabs.TabPane tab='房间管理' key='/bedallot/room'></Tabs.TabPane>
				</Tabs>
			</CommonHeader>
			<main className={styles.content_wrap}>
				<Card
					style={{ width: 280 }}
					className='mr-6 flex-shrink-0'
					title={
						<div className='flex items-center justify-between'>
							<Space>
								<UserOutlined />
								楼层分布
							</Space>
						</div>
					}
				>
					<Spin spinning={loading}>
						<Tree.DirectoryTree
							blockNode
							onSelect={console.log}
							treeData={treeData}
							defaultExpandAll
							titleRender={(node) => <TreeTitleWrapper {...node} />}
						/>
					</Spin>
					<ModalForm title={{title:"12312", tooltip:'123123123'}} trigger={<Button type='primary'>1231213</Button>}>
						<ProFormText name="a" label='2131231' />
					</ModalForm>
				</Card>
				<div className='flex-auto overflow-x-hidden'>{children}</div>
			</main>
		</div>
	)
}

export default MonitorLayout
