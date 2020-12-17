import React, { PropsWithChildren } from "react"
import { Card, Form, Input, Popconfirm, Select, Space, Tabs, Tree } from "antd"
import { CommonHeader } from "@/components/PepLife"
import {
	BankOutlined,
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
	PlusOutlined,
	UserOutlined,
} from "@ant-design/icons"
import styles from "./style.module.scss"
import { IBaseProps } from "@/@types/fc"
import { useHistory } from "react-router-dom"
import ModalTrigger from "@/components/ModalTrigger"
function TreeTitleWrapper(props: { title: React.ReactNode }) {
	return (
		<div className={styles.tree_title_wrap}>
			<span className={styles.tree_title}>{props.title}</span>

			<Space className={styles.action}>
				<ModalTrigger trigger={<PlusOutlined />} title='新增子集分类'>
					<Form.Item label='上级产品分类' labelCol={{ span: 6 }}>
						<Select
							options={[
								{
									label: "分类名称",
									value: "123",
								},
							]}
						></Select>
					</Form.Item>
					<Form.Item label='产品分类名称' required labelCol={{ span: 6 }}>
						<Input />
					</Form.Item>
				</ModalTrigger>
				<ModalTrigger trigger={<EditOutlined />} title='编辑分类'>
					<Form.Item label='产品分类名称' required labelCol={{ span: 6 }}>
						<Input />
					</Form.Item>
				</ModalTrigger>
				<Popconfirm title='确定删除?'>
					<DeleteOutlined />
				</Popconfirm>
			</Space>
		</div>
	)
}
const treeData = [
	{
		title: "智能床垫",
		key: "0-0",
		children: [
			{
				title: "MAT-224",
				key: "0-0-0",
				isLeaf: true,
			},
			{
				title: "MAT-220W",
				key: "0-0-1",
				isLeaf: true,
			},
		],
	},
	{
		title: "尿检马桶",
		key: "0-1",
		children: [
			{
				title: "TLT-358",
				key: "0-1-0",
				isLeaf: true,
			},
		],
	},
	{
		title: "监护手表",
		key: "0-2",
		children: [
			{
				title: "H66",
				key: "0-2-0",
				isLeaf: true,
			},
		],
	},
	{
		title: "血糖仪",
		key: "0-3",
		children: [
			{
				title: "GLU-258",
				key: "0-3-0",
				isLeaf: true,
			},
		],
	},
	{
		title: "血压计",
		key: "0-4",
		children: [
			{
				title: "BP-658",
				key: "0-4-0",
				isLeaf: true,
			},
		],
	},
	{
		title: "血氧仪",
		key: "0-5",
		children: [
			{
				title: "SPO-358",
				key: "0-5-0",
				isLeaf: true,
			},
		],
	},
	{
		title: "心电仪",
		key: "0-6",
		children: [
			{
				title: "HR-658",
				key: "0-6-0",
				isLeaf: true,
			},
		],
	},
	{
		title: "体脂秤",
		key: "0-7",
		children: [
			{
				title: "WGT-658",
				key: "0-7-0",
				isLeaf: true,
			},
		],
	},
]
// 设备管理 layout
function Layout(props: PropsWithChildren<IBaseProps>) {
	const { children, location } = props
	const { push } = useHistory()
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
								<UserOutlined />
								设备分类
							</span>
							<ModalTrigger trigger={<PlusCircleOutlined />}>
								add device cate
							</ModalTrigger>
						</div>
					}
				>
					<Tree.DirectoryTree
						expandedKeys={treeData.map((item) => item.key)}
						titleRender={(node) => {
							const { title, ...rest } = node
							// 这里可以添加wrapper逻辑
							return <TreeTitleWrapper {...rest} title={title} />
						}}
						selectable={false}
						multiple
						defaultExpandAll
						treeData={treeData}
					/>
				</Card>
				<div className='flex-auto overflow-x-hidden'>{children}</div>
			</main>
		</div>
	)
}

export default Layout
