import React, { PropsWithChildren, useMemo, useState } from "react"
import { Button, Card, Space, Spin, Tabs, Tree } from "antd"
import { CommonHeader } from "@/components/PepLife"
import { BankOutlined, UserOutlined } from "@ant-design/icons"
import styles from "./style.module.scss"
import { IBaseProps } from "@/@types/fc"
import { useHistory, useLocation } from "react-router-dom"
import useFetchData from "@/hooks/useFetchData"
import TreeTitleWrapper from "../components/TreeTitleWrapper"
import { convertTreeNode } from "../utils"
import BedAllotContext from "../BedAllotContext"
import { TreeProps } from "antd/lib/tree"

// 床位分配 layout
function MonitorLayout(props: PropsWithChildren<IBaseProps>) {
	const { children } = props
	const { push } = useHistory()
	const location = useLocation()
	const [buildingId, setBuildingId] = useState<string | number | undefined>(
		undefined
	)
	const { data, loading, error } = useFetchData({
		url: "/orgmgt/building/treeList",
		method: "post",
		auto: true,
	})
	const treeData = useMemo(() => {
		if (!data) return []
		return convertTreeNode(data?.result, "orgBuildings")
	}, [data])

	const handleSelectTree: TreeProps["onSelect"] = (keys) => {
		setBuildingId(keys[0])
	}
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
							onSelect={handleSelectTree}
							treeData={treeData}
							defaultExpandAll
							titleRender={(node) => <TreeTitleWrapper {...node} />}
						/>
					</Spin>
				</Card>
				<BedAllotContext.Provider value={buildingId}>
					<div className='flex-auto'>{children}</div>
				</BedAllotContext.Provider>
			</main>
		</div>
	)
}

export default MonitorLayout
