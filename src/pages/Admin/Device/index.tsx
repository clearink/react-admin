import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Space } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import ProTable from "@/components/Pro/ProTable"
import { Random } from "mockjs"
import { colorArray } from "@/components/Pro/utils/FieldEnumUtil"

const columns: ProTableColumns<any>[] = [
	{
		title: "设备编号",
		dataIndex: "num",
		width: 100,
		search: true,
		fieldProps: {
			label: false,
			copyable: true,
			placeholder: "名称/编号",
			ellipsis: true,
		},
	},
	{
		title: "SIM卡号(ICCID)",
		width: 200,
		dataIndex: "iccId",
		fieldProps: {
			label: false,
			copyable: true,
			ellipsis: true,
		},
	},
	{
		title: "使用状态",
		width: 200,
		dataIndex: "status",
		field: "select",
		fieldProps: {
			fieldEnum: colorArray,
			options: ["启用", "停用"],
		},
	},
	{
		title: "使用人/房间",
		width: 140,
		dataIndex: "user",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "领出人",
		width: 160,
		dataIndex: "getter",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "操作",
		key: "action",
		fixed: "right" as "right",
		width: 360,
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
		num: `MAT20200${Random.integer(10000, 80000)}`,
		iccId: `${Random.integer(1000, 8000)}00MFSSYYGXXXXXXP`,
		status: Random.boolean() ? "启用" : "停用",
		user: Random.cname(),
		getter: Random.cname(),
	}
})

// 设备管理
function Device() {
	return (
		<div className='bg-white h-full'>
			<ProTable
				bordered
				dataSource={data}
				columns={columns}
				// scroll={{ x: 1000 }}
			/>
		</div>
	)
}
export default memo(Device)
