import React, { memo, useMemo, useRef, useState } from "react"
import { Button, Space } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { ProTableColumns, ProTableRef } from "@/components/Pro/ProTable/type"
import ProTable from "@/components/Pro/ProTable"
import FieldAvatar from "@/components/Pro/ProField/components/FieldAvatar"
import {
	bsConvertTableList,
	formatTableSearchParams,
} from "@/utils/formatValues"
import ResidentAddForm from "./components/add"
import ResidentEditForm from "./components/edit"
import { DrawerFormRef } from "@/components/Pro/ProForm/components/DrawerForm"
import { sleep } from "@/utils/test"
import {
	ProFormDate,
	ProFormInput,
	ProFormSelect,
	ProFormTreeSelect,
} from "@/components/Pro/ProForm"
import { FieldDate, FieldStatus, FieldText } from "@/components/Pro/ProField"
import ResidentApi from "@/http/api/pages/ResidentApi"
import formatValue from "@/utils/form/formatValue"
import { convertTreeNode } from "../BedAllot/utils"
const columns: ProTableColumns<any>[] = [
	{
		title: "头像",
		dataIndex: "avatar",
		read: <FieldAvatar icon={<UserOutlined />} />,
	},
	{
		title: "姓名",
		dataIndex: "name",
		read: <FieldText copyable />,
		search: (
			<ProFormInput
				label={undefined}
				placeholder='性别/手机'
				name='nameOrMobile'
			/>
		),
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
		read: <FieldStatus />,
		search: (
			<ProFormTreeSelect
				label={undefined}
				placeholder='选择楼层'
				name='buildingId'
				request={{
					url: "/orgmgt/building/treeList",
					method: "post",
					transform: (response, cache) => {
						if (cache) return response
						return convertTreeNode(response.result, "orgBuildings") ?? []
					},
				}}
			/>
		),
	},
	{
		title: "入住房间",
		dataIndex: "roomName",
		search: <ProFormInput label={undefined} placeholder='选择房间' />,
	},
	{
		title: "时间",
		dataIndex: "time",
		read: <FieldDate />,
		search: <ProFormDate placeholder='选择时间' />,
	},
	{
		title: "住户手机",
		dataIndex: "mobile",
		read: <FieldText copyable />,
	},
	{
		title: "紧急联系电话",
		dataIndex: "contactNumber",
		read: <FieldText copyable />,
	},
	{
		title: "账号状态",
		dataIndex: "enabled",
		render: (dom, value) => {
			return value ? "正常" : "离院"
		},
	},
]

function Resident() {
	const [editId, setEditId] = useState<string | undefined>(undefined)

	const addRef = useRef<DrawerFormRef>(null)
	const editRef = useRef<DrawerFormRef>(null)
	const tableRef = useRef<ProTableRef>(null)

	const tableColumns = useMemo(() => {
		return columns.concat({
			title: "操作",
			dataIndex: "id",
			render: (dom, id) => {
				return (
					<Space>
						<Button type='link' size='small'>
							<Link to={`/resident/${id}`}>住户详情</Link>
						</Button>

						<Button type='link' size='small'>
							处理设置
						</Button>
						<Button
							type='link'
							size='small'
							onClick={() => {
								editRef.current?.toggle()
								setEditId(id)
							}}
						>
							编辑
						</Button>
						<Button type='link' size='small'>停护</Button>
					</Space>
				)
			},
		})
	}, [])
	return (
		<>
			<ProTable
				rowKey='id'
				ref={tableRef}
				columns={tableColumns}
				title='住户管理'
				request={{
					url: "/orgmgt/member/list",
					method: "post",
					params: { pageNo: 1, pageSize: 10 },
					transform: bsConvertTableList,
				}}
				onSearch={formatTableSearchParams}
				onCreate={() => {
					addRef.current?.toggle()
				}}
			/>
			<ResidentAddForm
				title='新增住户'
				ref={addRef}
				onFinish={async (values) => {
					await ResidentApi.AddResident(formatValue(values))
					tableRef.current?.reload()
					return true
				}}
			/>
			<ResidentEditForm
				title='编辑住户'
				id={editId}
				ref={editRef}
				onFinish={async () => {
					await sleep(1000)
					return true
				}}
			/>
		</>
	)
}
export default memo(Resident)
