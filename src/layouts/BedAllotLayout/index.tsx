import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react"
import { Card, message, Skeleton, Tabs, Tree } from "antd"
import { CommonHeader } from "@/components/PepLife"
import {
	BankOutlined,
	PlusCircleOutlined,
	UserOutlined,
} from "@ant-design/icons"
import styles from "./style.module.scss"
import { IBaseProps } from "@/@types/fc"
import { useHistory } from "react-router-dom"
import useMemoFetch from "@/hooks/useMemoFetch"
import TreeTitleWrapper from "@/components/PepLife/TreeTitleWrapper"
import { convertTreeNode } from "../../pages/BedAllot/utils"
import BedAllotContext from "../../pages/BedAllot/BedAllotContext"
import { TreeProps } from "antd/lib/tree"
import { DrawerFormRef } from "@/components/Pro/ProForm/components/DrawerForm"
import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import { ProFormInput } from "@/components/Pro/ProForm"
import BedAllotApi from "@/http/api/pages/BedAllotApi"
import AddForm from "@/components/BigSight/Form/AddForm"
import EditForm from "@/components/BigSight/Form/EditForm"

// 床位分配 layout
function MonitorLayout(props: PropsWithChildren<IBaseProps>) {
	const { children, location } = props
	const { push } = useHistory()
	const [buildingId, setBuildingId] = useState<string | number | null>(null)
	const addRef = useRef<DrawerFormRef>(null)
	const editRef = useRef<DrawerFormRef>(null)

	const [{ data: treeData, loading }, fetchData, updateMemo] = useMemoFetch({
		url: "/orgmgt/building/treeList",
		method: "post",
		cache: true,
		transform: (response, cache) => {
			if (cache) return response
			if (response) return convertTreeNode(response?.result, "orgBuildings")
			return []
		},
	})

	const handleSelectTree: TreeProps["onSelect"] = (keys, { node }) => {
		if (keys[0] === buildingId) setBuildingId(null)
		else setBuildingId(keys[0])
	}
	const selectKeys = useMemo(() => {
		if (buildingId === null) return []
		return [buildingId]
	}, [buildingId])
	// 新建

	const [addId, setAddId] = useState<string | undefined>()
	const handleCreate = useMemoCallback((id: string | undefined) => {
		addRef.current?.toggle()
		setAddId(id)
	}, [])
	const [editId, setEditId] = useState<string | undefined>()
	const handleEdit = useMemoCallback((id: string) => {
		editRef.current?.toggle()
		setEditId(id)
	}, [])

	// 删除 楼层
	const handleDelete = useMemoCallback(async (id: string) => {
		// 请求接口
		await BedAllotApi.remove({ id })
		updateMemo()
	}, [])
	// 编辑
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
							<span>
								<UserOutlined className='mr-4' />
								楼层分布
							</span>
							<PlusCircleOutlined
								className='cursor-pointer'
								onClick={() => handleCreate(undefined)}
							/>
						</div>
					}
				>
					<Skeleton loading={loading || !treeData} paragraph={{ rows: 10 }}>
						<Tree.DirectoryTree
							height={688}
							onSelect={handleSelectTree}
							treeData={treeData}
							defaultExpandAll
							selectedKeys={selectKeys}
							className={styles.tree}
							titleRender={(node) => {
								return (
									<TreeTitleWrapper
										key={node.key}
										id={node.key as string}
										onCreate={handleCreate}
										onEdit={handleEdit}
										onDelete={handleDelete}
										title={node.title}
										isLeaf={node.isLeaf}
									/>
								)
							}}
						/>
					</Skeleton>
				</Card>
				{/* 楼层修改表单 */}
				<EditForm
					title='编辑楼层'
					ref={editRef}
					name='edit-floor'
					id={editId}
					type='modal'
					request={{
						url: "/orgmgt/building/queryById",
						params: { id: editId },
					}}
					onFinish={async (values) => {
						await BedAllotApi.edit(values)
						updateMemo() // reload tree
						message.success("修改成功")
						return true
					}}
				>
					<ProFormInput label='楼层名称' autoFocus name='name' />
				</EditForm>

				{/* 楼层新增表单 */}
				<AddForm
					type='modal'
					title='新增楼层'
					ref={addRef}
					name='add-floor'
					onFinish={async (value) => {
						await BedAllotApi.add({ parentId: addId, ...value })
						// reload
						updateMemo()
						return true
					}}
				>
					<ProFormInput label='楼层名称' name='name' />
				</AddForm>

				<BedAllotContext.Provider value={buildingId}>
					<div className='flex-auto'>{children}</div>
				</BedAllotContext.Provider>
			</main>
		</div>
	)
}

export default MonitorLayout
