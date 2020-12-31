import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Space } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import ProTable from "@/components/Pro/ProTable"
import { FieldAvatarProps } from "@/components/Pro/ProField/components/FieldAvatar"
import {
	commonTransformServerData,
	formatTableSearchParams,
} from "@/utils/formatValues"

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
		dataIndex: "gender",
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
		dataIndex: "roomName",
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
		dataIndex: "mobile",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "紧急联系电话",
		dataIndex: "contactNumber",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "账号状态",
		dataIndex: "enabled",
		render:(value)=>{
			return value ? "正常" :'离院'
		}
	},
	{
		title: "操作",
		dataIndex: "id",
		width: 300,
		render: (value) => {
			return (
				<Space>
					<Link to={`/resident/${value}`}>住户详情</Link>
					<span>处理设置</span>
					<span>设备详情</span>
					<span>编辑</span>
					<span>停护</span>
				</Space>
			)
		},
	},
]

function Resident() {
	return (
		<ProTable
			bordered
			rowKey='id'
			columns={columns}
			title='床位管理'
			request={{
				url: "/orgmgt/member/list",
				method: "post",
				params: { pageNo: 1, pageSize: 10 },
			}}
			onSearch={formatTableSearchParams}
			transform={commonTransformServerData}
		/>
	)
}
export default memo(Resident)
