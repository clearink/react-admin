import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Button, Form, Input, Space, Switch, Table } from "antd"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import ModalTrigger from "@/components/ModalTrigger"
import { Random } from "mockjs"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { InputProps } from "antd/lib/input"
const columns: ProTableColumns[] = [
	{
		title: "方案名称",
		dataIndex: "name",
		search: true,
		fieldProps: {
			label: false,
			placeholder: "方案名称",
			suffix: <SearchOutlined />,
		} as any,
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
const data = Array.from({ length: 10 }, (_, i) => {
	return {
		key: i,
		name: `提醒方案${i}`,
		type: Random.boolean() ? "设备" : "设备 / 公众号",
		status: Random.boolean(),
	}
})
// 提醒设置
function Remind() {
	return (
		<div className='h-full bg-white'>
			<ProTable dataSource={data} columns={columns} bordered />
		</div>
	)
}
export default memo(Remind)
