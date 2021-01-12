import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Space, Switch } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { ProFormInput } from "@/components/Pro/ProForm"
const columns: ProTableColumns[] = [
	{
		title: "方案名称",
		dataIndex: "name",
		search: (
			<ProFormInput
				label={undefined}
				placeholder='方案名称'
				suffix={<SearchOutlined />}
			/>
		),
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
// 提醒设置
function Remind() {
	return (
		<div className='h-full bg-white'>
			<ProTable dataSource={[]} columns={columns} bordered />
		</div>
	)
}
export default memo(Remind)
