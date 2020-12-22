import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Button, Form, Input, Space, Table } from "antd"
import { DownloadOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons"
import ModalTrigger from "@/components/ModalTrigger"

const columns = [
	{
		title: "设备编号",
		dataIndex: "num",
		width: 150,
	},
	{
		title: "SIM卡号(ICCID)",
		width: 250,
		dataIndex: "iccId",
	},
	{
		title: "使用状态",
		dataIndex: "status",
	},
	{
		title: "使用人/房间",
		dataIndex: "user",
	},
	{
		title: "领出人",
		dataIndex: "getter",
	},
	{
		title: "操作",
		key: "action",
		fixed: "right" as "right",
		width: 320,
		render: () => (
			<Space>
				<span>
					<UserOutlined />
					查看人员信息
				</span>
				<span>
					<UserOutlined />
					编辑
				</span>
				<span>
					<UserOutlined />
					删除
				</span>
			</Space>
		),
	},
]
const data = Array.from({ length: 30 }, (_, i) => {
	return {
		key: i,
		num: "MAT2020080011",
		iccId: "898600MFSSYYGXXXXXXP",
		status: "启用",
		user: "李强",
		getter: "王明",
	}
})

// 设备管理
function Device() {
	return (
		<div className='bg-white h-full p-6'>
			<Form className='mr-4'>
				<Space className='flex items-start'>
					<Form.Item name='name'>
						<Input placeholder='名称/编号' />
					</Form.Item>
					<ModalTrigger
						trigger={
							<Button type='primary'>
								<PlusOutlined />
								新增设备
							</Button>
						}
					>
						新增设备表单
					</ModalTrigger>

					<Button>
						<DownloadOutlined />
						批量导入
					</Button>
				</Space>
			</Form>
			<Table
				bordered
				dataSource={data}
				columns={columns}
				 scroll={{ x: 1000 }}
			/>
		</div>
	)
}
export default memo(Device)
