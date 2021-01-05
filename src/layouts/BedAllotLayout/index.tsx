import React, { PropsWithChildren, useMemo, useState } from "react"
import { Card, Skeleton, Space, Tabs, Tree } from "antd"
import classNames from "classnames"
import { CommonHeader } from "@/components/PepLife"
import { BankOutlined, UserOutlined } from "@ant-design/icons"
import styles from "./style.module.scss"
import { IBaseProps } from "@/@types/fc"
import { useHistory, useLocation } from "react-router-dom"
import useMemoFetch from "@/hooks/useMemoFetch"
import TreeTitleWrapper from "@/components/PepLife/TreeTitleWrapper"
import { convertTreeNode } from "../../pages/BedAllot/utils"
import BedAllotContext from "../../pages/BedAllot/BedAllotContext"
import { TreeProps } from "antd/lib/tree"

// 床位分配 layout
function MonitorLayout(props: PropsWithChildren<IBaseProps>) {
	const { children } = props
	const { push } = useHistory()
	const location = useLocation()
	const [buildingId, setBuildingId] = useState<string | number | undefined>(
		undefined
	)
	const [data, loading] = useMemoFetch({
		url: "/orgmgt/building/treeList",
		params: {},
		method: "post",
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
					<Skeleton loading={loading} paragraph={{ rows: 10 }}>
						<Tree.DirectoryTree
							blockNode
							onSelect={handleSelectTree}
							treeData={treeData}
							defaultExpandAll
							titleRender={(node) => <TreeTitleWrapper {...node} />}
						/>
					</Skeleton>
				</Card>
				<BedAllotContext.Provider value={buildingId}>
					<div className='flex-auto'>{children}</div>
				</BedAllotContext.Provider>
			</main>
		</div>
	)
}

export default MonitorLayout
