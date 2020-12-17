import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Button, Form, Input, Space, Switch, Table } from "antd"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import ModalTrigger from "@/components/ModalTrigger"
const columns = [
	{
		title: "方案名称",
		dataIndex: "name",
	},
	{
		title: "提醒渠道",
		dataIndex: "type",
	},
	{
		title: "启用",
		dataIndex: "status",
		render: () => <Switch />,
	},
	{
		title: "操作",
		key: "action",
		fixed: "right" as "right",
		width: 140,
		render: () => (
			<Space>
				<span>编辑</span>
				<span>删除</span>
			</Space>
		),
	},
]
const data = Array.from({ length: 100 }, (_, i) => {
	return {
		key: i,
		name: "提醒方案0",
		type: "设备",
		status: true,
	}
})
// 提醒设置
function Remind() {
	return (
		<div className='h-full bg-white p-6'>
			<Form>
				<Space>
					<Form.Item>
						<Input suffix={<SearchOutlined />} placeholder='方案名称' />
					</Form.Item>
					<Form.Item>
						<ModalTrigger
							trigger={
								<Button type='primary'>
									<PlusOutlined />
									新增提醒
								</Button>
							}
						>
							新增提醒表单
						</ModalTrigger>
					</Form.Item>
				</Space>
			</Form>
			<Table
				dataSource={data}
				columns={columns}
				bordered
				scroll={{ x: 1000 }}
			/>
		</div>
	)
}
export default memo(Remind)
