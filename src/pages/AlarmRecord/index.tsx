import React, { memo, useMemo, useRef, useState } from "react"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns, ProTableRef } from "@/components/Pro/ProTable/type"
import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Space } from "antd"
import { colorArray } from "@/components/Pro/ProField/components/FieldStatus/utils"
import {
	bsConvertTableList,
	formatTableSearchParams,
} from "@/utils/formatValues"
import { DrawerFormRef } from "@/components/Pro/ProForm/components/DrawerForm"
import FieldDate from "@/components/Pro/ProField/components/FieldDate"
import AddAlarmForm from "./components/add"
import { convertFloorRoomTree } from "./utils"
import { ProFormInput, ProFormSelect } from "@/components/Pro/ProForm"
import {
	FieldAvatar,
	FieldStatus,
	FieldText,
	FieldTreeStatus,
} from "@/components/Pro/ProField"
import { BSTreeSelect } from "@/components/BigSight"
import UserAlarmDetail from "@/pages/Home/HeaderExtra/UserAlarm/UserAlarmDetail/UserAlarm.Detail"
import AlarmApi from "@/http/api/pages/AlarmApi"
// 告警记录
export const alarmColumns = [
	{
		title: "标识",
		dataIndex: "avatar",
		width: 80,
		key: "avatar",
		render: () => <Avatar icon={<UserOutlined />} />,
	},
	{
		title: "告警用户",
		dataIndex: "user",
		search: true,
	},
	{
		title: "告警类型",
		width: 300,
		dataIndex: "type",
	},
	{
		title: "告警时间",
		dataIndex: "time",
	},
	{
		title: "持续时长",
		dataIndex: "description",
	},
	{
		title: "护管人员",
		dataIndex: "nurse",
	},
	{
		title: "处理状态",
		dataIndex: "status",
	},
	{
		title: "操作",
		key: "action",
		fixed: "right" as "right",
		width: 250,
		render: () => (
			<Space>
				<span>处理设置</span>
				<span>设备详情</span>
				<span>编辑</span>
				<span>停护</span>
			</Space>
		),
	},
]
const alarmArray = "离床超时,心率异常,呼吸率异常,体动频繁,围栏越界,血氧含量低".split(
	","
)

const columns: ProTableColumns<any>[] = [
	{
		title: "标识",
		dataIndex: ["member", "avatar"],
		read: <FieldAvatar size={30} icon={<UserOutlined />} />,
	},
	{
		title: "告警用户",
		dataIndex: ["member", "name"],
		width: 100,
		search: <ProFormInput name='name' placeholder='姓名' label={undefined} />,
		read: <FieldText copyable />,
	},
	{
		dataIndex: "orgRoomId",
		// hideInTable: true,
		read: <FieldTreeStatus statusList={colorArray} />,
		search: <BSTreeSelect name='roomId' placeholder='选择房间/楼层' />,
		fieldProps: {
			request: {
				url: "/orgmgt/room/tree",
				method: "post",
				transform: (response, cache) => {
					if (cache) return response
					return convertFloorRoomTree(response.result, "childList") ?? []
				},
			},
		},
	},
	{
		title: "告警类型",
		dataIndex: "alarmType",
		search: <ProFormSelect placeholder='告警类型' label={undefined} />,
		read: <FieldStatus statusList={colorArray} />,
		fieldProps: {
			options: alarmArray,
		},
	},
	{
		title: "告警时间",
		dataIndex: "alarmTime",
		width: 160,
		read: <FieldDate timeFormat='YYYY/MM/DD HH:mm' />,
	},
	{
		title: "持续时长",
		dataIndex: "description",
	},
	{
		title: "护管人员",
		width: 140,
		dataIndex: ["member", "careWorkerName"],
		read: <FieldText />,
	},
	{
		title: "处理状态",
		dataIndex: "status",
		read: <FieldStatus statusList={["green", "red"]} />,
		fieldProps: {
			options: ["已处理", "待处理"],
		},
	},
]
function AlarmRecord() {
	const addRef = useRef<DrawerFormRef>(null)
	const editRef = useRef<DrawerFormRef>(null)
	const tableRef = useRef<ProTableRef>(null)
	const [editId, setEditId] = useState<string | undefined>(undefined)
	const handleEdit = (id?: string) => {
		setEditId(id)
		editRef.current?.toggle()
	}
	const tableColumns = useMemo(() => {
		return columns.concat({
			title: "操作",
			dataIndex: "id",
			render: (_, id) => (
				<Space>
					<Button type='link' onClick={() => handleEdit(id)}>
						告警处理
					</Button>
					<Button type='link'>设备详情</Button>
				</Space>
			),
		})
	}, [])
	return (
		<div className='h-full flex flex-col'>
			<ProTable
				ref={tableRef}
				columns={tableColumns}
				rowKey='id'
				title={{ title: "告警记录", tooltip: "用于告知管理员告警信息" }}
				request={{
					url: "/orgmgt/alarm/list",
					params: {
						pageNo: 1,
						pageSize: 10,
					},
					method: "post",
					transform: bsConvertTableList,
				}}
				onSearch={formatTableSearchParams}
				onCreate={() => {
					addRef.current?.toggle()
				}}
				renderAction={(dom) => dom.slice(-2)}
			/>
			<AddAlarmForm name='add alarm form' ref={addRef} />
			<UserAlarmDetail
				id={editId}
				ref={editRef}
				onFinish={async (values) => {
					await AlarmApi.CheckAlarm(values)
					tableRef.current?.reload()
					return true
				}}
			/>
		</div>
	)
}
export default memo(AlarmRecord)
