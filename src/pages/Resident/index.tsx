import React, { memo, useEffect, useMemo, useRef, useState } from "react"
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
import { DrawerFormRef } from "@/components/Pro/ProForm/components/DrawerForm"
import {
	ProFormDate,
	ProFormInput,
	ProFormSelect,
	ProFormTreeSelect,
} from "@/components/Pro/ProForm"
import { FieldDate, FieldStatus, FieldText } from "@/components/Pro/ProField"
import ResidentApi from "@/http/api/pages/ResidentApi"
import { convertRoomTree } from "../BedAllot/utils"
import { FormInstance } from "antd/lib/form"

function Resident() {
	const addRef = useRef<DrawerFormRef>(null)
	const tableRef = useRef<ProTableRef>(null)
	const formRef = useRef<FormInstance>(null)

	const [buildingId, setBuildingId] = useState<string | null>(null)
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
			searchOrder: 1,
			search: (
				<ProFormInput
					label={undefined}
					placeholder='姓名/手机'
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
					onChange={(newId) => {
						formRef.current?.setFieldsValue({ roomId: undefined })
						setBuildingId(newId)
					}}
					label={undefined}
					placeholder='选择楼层'
					name='buildingId'
					request={{
						url: "/orgmgt/building/tree",
						method: "post",
						transform: (response, cache) => {
							console.log(response)
							if (cache) return response
							return convertRoomTree(response.result, "childList")
						},
					}}
				/>
			),
		},
		{
			title: "入住房间",
			dataIndex: "roomName",
			search: (
				<ProFormSelect
					name='roomId'
					request={{
						url: buildingId ? "/orgmgt/room/list/queryByBuildingId" : undefined,
						params: { id: buildingId },
						transform: (response) => {
							return response.result?.map((item: any) => ({
								label: item.num,
								value: item.id,
							}))
						},
					}}
					label={undefined}
					placeholder='选择房间'
				/>
			),
		},
		{
			title: "时间",
			dataIndex: "createTime",
			read: <FieldDate />,
			search: <ProFormDate placeholder='选择时间' label={undefined} />,
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
		{
			title: "操作",
			dataIndex: "id",
			render: (dom, id) => {
				return (
					<Space>
						<Link to={`/resident/${id}`}>住户详情</Link>
						<Button type='link' size='small'>
							处理设置
						</Button>
						<Button type='link' size='small'>
							停护
						</Button>
					</Space>
				)
			},
		},
	]

	return (
		<>
			<ProTable
				rowKey='id'
				formRef={formRef}
				ref={tableRef}
				columns={columns}
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
				onDelete={async (ids) => {
					await ResidentApi.RemoveResident({ ids })
				}}
			/>
			<ResidentAddForm
				title='新增住户'
				ref={addRef}
				onFinish={async (values) => {
					await ResidentApi.AddResident(values)
					tableRef.current?.reload()
					return true
				}}
			/>
			{/* <ResidentEditForm
				title='编辑住户'
				id={editId}
				ref={editRef}
				onFinish={async (values) => {
					await ResidentApi.EditResident(values)
					tableRef.current?.reload()
					setEditId(undefined)
					return true
				}}
			/> */}
		</>
	)
}
export default memo(Resident)
