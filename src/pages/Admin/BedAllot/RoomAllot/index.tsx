import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import {
	Button,
	Card,
	Form,
	Input,
	Popconfirm,
	Select,
	Space,
	Switch,
	Table,
	Tree,
} from "antd"
import {
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
	UserOutlined,
} from "@ant-design/icons"
import ModalTrigger from "@/components/ModalTrigger"

const TreeTitleWrapper = (props: { title: React.ReactNode }) => {
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
		title: "主楼",
		key: "0-0",
		children: [
			{
				title: "一楼",
				key: "0-0-0",
				isLeaf: true,
			},
			{
				title: "二楼",
				key: "0-0-1",
				isLeaf: true,
			},
			{
				title: "三楼",
				key: "0-0-2",
				isLeaf: true,
			},
		],
	},
	{
		title: "东翼副楼",
		key: "0-1",
		children: [
			{
				title: "一楼",
				key: "0-1-0",
				isLeaf: true,
			},
			{
				title: "二楼",
				key: "0-1-1",
				isLeaf: true,
			},
			{
				title: "三楼",
				key: "0-1-2",
				isLeaf: true,
			},
		],
	},
	{
		title: "西翼副楼",
		key: "0-2",
		children: [
			{
				title: "一楼",
				key: "0-2-0",
				isLeaf: true,
			},
			{
				title: "二楼",
				key: "0-2-1",
				isLeaf: true,
			},
			{
				title: "三楼",
				key: "0-2-2",
				isLeaf: true,
			},
		],
	},
	{
		title: "康复中心",
		key: "0-3",
		children: [
			{
				title: "一楼",
				key: "0-3-0",
				isLeaf: true,
			},
			{
				title: "二楼",
				key: "0-3-1",
				isLeaf: true,
			},
			{
				title: "三楼",
				key: "0-3-2",
				isLeaf: true,
			},
		],
	},
]
const columns = [
	{
		title: "房间编号",
		width: 100,
		dataIndex: "num",
	},
	{
		title: "入住人数/床位数",
		dataIndex: "user",
	},
	{
		title: "护管人员",
		dataIndex: "nurse",
	},
	{
		title: "开放状态",
		dataIndex: "open",
		render() {
			return <Switch />
		},
	},
	{
		title: "床垫设备号",
		key: "action",
		fixed: "right" as "right",
		width: 250,
		render: () => {
			return (
				<Space>
					<span>
						<UserOutlined />
						查看入住人员
					</span>
					<span>
						<UserOutlined />
						编辑
					</span>
					<span>
						<DeleteOutlined />
						删除
					</span>
				</Space>
			)
		},
	},
]
const data = Array.from({ length: 40 }, (_, i) => {
	return {
		key: i,
		num: i,
		user: "3/4",
		nurse: "王晓霞",
		open: false,
	}
})
function RoomAllot() {
	return (
		<div className={styles.page_wrap}>
			<Card
				title={
					<Space>
						<UserOutlined />
						楼层分布
					</Space>
				}
				className={styles.left}
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
			<div className={styles.right}>
				<div className='mb-6 py-4'>
					<Select placeholder='房间编号' style={{ width: 200 }} />
					<Button className='ml-8' type='primary'>
						<PlusOutlined />
						新增房间
					</Button>
				</div>
				<Table
					rowSelection={{
						selectedRowKeys: [],
						onChange: () => {},
					}}
					columns={columns as any[]}
					dataSource={data}
					bordered
					// scroll={{ x: 1000 }}
				/>
			</div>
		</div>
	)
}
export default memo(RoomAllot)
