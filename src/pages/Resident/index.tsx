import React, { memo, useMemo, useRef, useState } from "react"
import classNames from "classnames"
import { Button, Space } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import ProTable from "@/components/Pro/ProTable"
import { FieldAvatarProps } from "@/components/Pro/ProField/components/FieldAvatar"
import {
	commonTransformServerData,
	formatTableSearchParams,
} from "@/utils/formatValues"
import ResidentAddForm from "./add"
import ResidentEditForm from "./edit"
import { DrawerFormRef } from "@/components/Pro/ProForm/components/DrawerForm"
import { sleep } from "@/utils/test"
const columns: ProTableColumns<any>[] = [
	{
		title: "头像",
		dataIndex: "avatar",
		field: "avatar",
		read: {
			icon: <UserOutlined />,
		} as FieldAvatarProps,
	},
	{
		title: "姓名",
		dataIndex: "name",
		search: {
			label: undefined,
			placeholder: "性别/手机",
		},
		read: {
			copyable: true,
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
		field: "select",
		search: {
			placeholder: "选择楼层",
			label: undefined,
		},
	},
	{
		title: "入住房间",
		dataIndex: "roomName",
		search: {
			label: undefined,
			placeholder: "选择房间",
		},
	},
	{
		title: "时间",
		dataIndex: "time",
		field: "date",
		search: {
			placeholder: "选择时间",
			label: undefined,
		},
	},
	{
		title: "住户手机",
		dataIndex: "mobile",
		read: {
			copyable: true,
		},
	},
	{
		title: "紧急联系电话",
		dataIndex: "contactNumber",
		read: {
			copyable: true,
		},
	},
	{
		title: "账号状态",
		dataIndex: "enabled",
		render: (value) => {
			return value ? "正常" : "离院"
		},
	},
]

function Resident() {
	const editRef = useRef<DrawerFormRef>(undefined)
	const addRef = useRef<DrawerFormRef>(undefined)

	const [editId, setEditId] = useState<string | undefined>(undefined)
	const tableColumns = useMemo(() => {
		return columns.concat({
			title: "操作",
			dataIndex: "id",
			render: (value) => {
				return (
					<Space>
						<Link to={`/resident/${value}`}>住户详情</Link>
						<Button type='link'>处理设置</Button>
						<Button
							type='link'
							onClick={() => {
								editRef.current?.toggle()
								setEditId(value)
							}}
						>
							编辑
						</Button>
						<Button type='link'>停护</Button>
					</Space>
				)
			},
		})
	}, [])
	return (
		<>
			<ProTable
				bordered
				rowKey='id'
				columns={tableColumns}
				title='住户管理'
				request={{
					url: "/orgmgt/member/list",
					method: "post",
					params: { pageNo: 1, pageSize: 10 },
				}}
				onSearch={formatTableSearchParams}
				transform={commonTransformServerData}
				onCreate={() => {
					addRef.current?.toggle()
				}}
			/>
			{/* 编辑 form */}
			<ResidentEditForm
				title='住户信息编辑'
				name='edit'
				id={editId}
				ref={editRef}
				request={{
					url: "/orgmgt/member/queryById",
					params: { id: editId },
					method: "get",
				}}
				onFinish={async () => {
					await sleep(1000)
					return true
				}}
			/>

			{/* 新增form */}
			<ResidentAddForm
				name='add'
				title='新增住户'
				ref={addRef}
				onFinish={async (values) => {
					console.log(values)
					await sleep(1000)
					return true
				}}
			/>
		</>
	)
}
export default memo(Resident)
