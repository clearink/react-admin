import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Avatar, Button, DatePicker, Form, Input, Select, Space } from "antd"
import {
	DownloadOutlined,
	PlusOutlined,
	RedoOutlined,
	SearchOutlined,
	ToTopOutlined,
	UserOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import ProTable from "@/components/Pro/ProTable"
import { FieldAvatarProps } from "@/components/Pro/ProField/components/FieldAvatar"
import { Random } from "mockjs"

const columns: ProTableColumns<any>[] = [
	{
		title: "头像",
		dataIndex: "avatar",
		field: "avatar",
		fieldProps: {
			icon: <UserOutlined />,
		} as FieldAvatarProps,
	},
	{
		title: "姓名",
		dataIndex: "name",
		search: true,
		fieldProps: {
			copyable: true,
			placeholder: "性别/手机",
			label: false,
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
		title: "入住楼层",
		dataIndex: "floor",
		search: true,
		field: "select",
		fieldProps: {
			placeholder: "选择楼层",
			label: false,
		},
	},
	{
		title: "入住房间",
		dataIndex: "room",
		search: true,
		fieldProps: {
			placeholder: "选择房间",
			label: false,
		},
	},
	{
		title: "时间",
		dataIndex: "time",
		search: true,
		field: "date",
		fieldProps: {
			placeholder: "选择时间",
			label: false,
		},
	},
	{
		title: "住户手机",
		dataIndex: "phone",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "紧急联系电话",
		dataIndex: "sosPhone",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "账号状态",
		dataIndex: "status",
	},
	{
		title: "操作",
		key: "action",
		fixed: "right" as "right",
		width: 300,
		render: () => (
			<Space>
				<Link to='/resident/1'>住户详情</Link>
				<span>处理设置</span>
				<span>设备详情</span>
				<span>编辑</span>
				<span>停护</span>
			</Space>
		),
	},
]
const data = Array.from({ length: 50 }, (_, i) => {
	return {
		key: i,
		avatar: "21",
		name: Random.cname(),
		sex: Random.boolean() ? "男" : "女",
		age: Random.integer(60, 80),
		floor: `主楼-${Random.integer(1, 9)}楼`,
		room: Random.integer(100, 500),
		phone: Random.integer(13088888888, 18088888888),
		sosPhone: "18088888888",
		status: Random.boolean() ? "在院" : "离院",
	}
})
function Resident() {
	return (
		<ProTable
			bordered
			columns={columns}
			dataSource={data}
			// scroll={{ x: 1200 }}
		/>
	)
}
export default memo(Resident)
