import React, { PropsWithChildren, useMemo, useState } from "react"
import { Card, Skeleton, Tabs, Tree } from "antd"
import { CommonHeader } from "@/components/PepLife"
import {
	BankOutlined,
	PlusCircleOutlined,
	UserOutlined,
} from "@ant-design/icons"
import styles from "./style.module.scss"
import { IBaseProps } from "@/@types/fc"
import { useHistory } from "react-router-dom"
import ModalTrigger from "@/components/ModalTrigger"
import useMemoFetch from "@/hooks/useMemoFetch"
import TreeTitleWrapper from "@/components/PepLife/TreeTitleWrapper"
import { TreeProps } from "antd/lib/tree"
import { convertDeviceTreeNode } from "./utils"
import DeviceContext from "@/pages/Device/DeviceContext"

// 设备管理 layout
function Layout(props: PropsWithChildren<IBaseProps>) {
	const { children, location } = props
	const { push } = useHistory()
	// 获取 设备树
	const [deviceType, setDeviceType] = useState<React.ReactText | null>(null)
	const [{ data, loading }, fetchData, updateMemo] = useMemoFetch({
		url: "/orgmgt/device/deviceList",
		cache: true,
		transform: (response, cache) => {
			if (cache) return response
			if (response) return convertDeviceTreeNode(response.result)
			return []
		},
	})
	const selectKeys = useMemo(() => {
		if (deviceType === null) return []
		return [deviceType]
	}, [deviceType])

	const handleSelectTree: TreeProps["onSelect"] = (keys) => {
		console.log(keys[0])
		if (keys[0] === deviceType) setDeviceType(null)
		else setDeviceType((keys[0] as string).split("/")[1])
	}
	const handleCreate = () => {}
	const handleDelete = () => {}
	const handleEdit = () => {}
	return (
		<div className={styles.page_wrap}>
			<CommonHeader icon={<BankOutlined />} title='设备管理' fixed>
				<Tabs
					className={styles.navbar}
					size='large'
					activeKey={location.pathname}
					onTabClick={(path) => push(path)}
				>
					<Tabs.TabPane tab='设备列表' key='/device'></Tabs.TabPane>
					<Tabs.TabPane tab='提醒设置' key='/device/remind'></Tabs.TabPane>
				</Tabs>
			</CommonHeader>
			<main className={styles.content_wrap}>
				<Card
					style={{ width: 280 }}
					className='mr-6 flex-shrink-0'
					title={
						<div className='flex items-center justify-between'>
							<span>
								<UserOutlined className='mr-2' />
								设备分类
							</span>
							<ModalTrigger trigger={<PlusCircleOutlined />}>
								新增设备分类
							</ModalTrigger>
						</div>
					}
				>
					<Skeleton loading={!data || loading} paragraph={{ rows: 10 }}>
						<Tree.DirectoryTree
							multiple
							onSelect={handleSelectTree}
							treeData={data}
							selectedKeys={selectKeys}
							defaultExpandAll
							titleRender={(node) => {
								return (
									<TreeTitleWrapper
										key={node.key}
										id={node.key as string}
										onCreate={handleCreate}
										onEdit={handleEdit}
										onDelete={handleDelete}
										title={node.title}
									/>
								)
							}}
						/>
					</Skeleton>
				</Card>
				<DeviceContext.Provider value={{ deviceType }}>
					<div className='flex-auto overflow-x-hidden'>{children}</div>
				</DeviceContext.Provider>
			</main>
		</div>
	)
}

export default Layout
