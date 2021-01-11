import React, { PropsWithChildren } from "react"
import {
	Card,
	Form,
	Input,
	Popconfirm,
	Select,
	Skeleton,
	Space,
	Tabs,
	Tree,
} from "antd"
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
import { Link, useHistory } from "react-router-dom"
import ModalTrigger from "@/components/ModalTrigger"
import useMemoFetch from "@/hooks/useMemoFetch"
import { convertDeviceTreeNode } from "./utils"
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

// 设备管理 layout
function Layout(props: PropsWithChildren<IBaseProps>) {
	const { children, location } = props
	const { push } = useHistory()
	// 获取 设备树
	const [{ data, loading }, fetchData, updateMemo] = useMemoFetch({
		url: "/orgmgt/device/deviceList",
		cache: true,
		transform: (response, cache) => {
			if (cache) return response
			if (response) return convertDeviceTreeNode(response.result)
			return []
		},
	})
	console.log(data)
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
					<Skeleton loading={!data} paragraph={{ rows: 10 }}>
						<Tree.DirectoryTree
							multiple
							treeData={data}
							defaultExpandAll
							titleRender={(node) => {
								const { title, ...rest } = node
								return <TreeTitleWrapper {...rest} title={title} />
							}}
						/>
					</Skeleton>
				</Card>
				<div className='flex-auto overflow-x-hidden'>{children}</div>
			</main>
		</div>
	)
}

export default Layout
