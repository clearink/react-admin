import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Avatar, Space } from "antd"
import { UserOutlined } from "@ant-design/icons"
import ProTable from "@/components/Pro/ProTable"
import { Random } from "mockjs"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { colorArray } from "@/components/Pro/utils/FieldEnumUtil"

// 护管管理

const columns: ProTableColumns<any>[] = [
	{
		title: "头像",
		dataIndex: "avatar",
		width: 80,
		render: () => <Avatar icon={<UserOutlined />} />,
	},
	{
		title: "姓名",
		dataIndex: "name",
		search: true,
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "性别",
		dataIndex: "sex",
	},
	{
		title: "年龄",
		dataIndex: "age",
	},
	{
		title: "身份证号",
		width: 200,
		dataIndex: "num",
	},
	{
		title: "联系电话",
		dataIndex: "phone",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "职务",
		dataIndex: "job",
	},
	{
		title: "账号状态",
		dataIndex: "status",
		search: true,
		field: "select",
		fieldProps: {
			fieldEnum: colorArray,
			options: ["正常", "离职"],
		},
	},
	{
		title: "操作",
		key: "action",
		fixed: "right" as "right",
		width: 300,
		render: () => (
			<Space>
				<span>护理分配</span>
				<span>认证信息</span>
				<span>编辑</span>
				<span>删除</span>
			</Space>
		),
	},
]
const data = Array.from({ length: 50 }, (_, i) => {
	return {
		key: i,
		avatar: i,
		name: Random.cname(),
		age: Random.integer(60, 80),
		sex: Random.boolean() ? "男" : "女",
		num: "45002219820503****",
		phone: Random.integer(13088888888, 18088888888),
		job: Random.integer(0, 2) === 1 ? "普通护工" : "高级护工",
		status: Random.boolean() ? "正常" : "离职",
	}
})
function Nurse() {
	return (
		<div className='h-full flex flex-col'>
			<ProTable
				bordered
				columns={columns}
				dataSource={data}
				// scroll={{ x: 1300 }}
			/>
		</div>
	)
}
export default memo(Nurse)
