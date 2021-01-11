import React, { memo, useMemo, useRef, useState } from "react"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns, ProTableRef } from "@/components/Pro/ProTable/type"
import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Space } from "antd"
import MOCK, { Random } from "mockjs"
import { colorArray } from "@/components/Pro/ProField/components/FieldStatus/utils"
import {
	bsConvertTableList,
	formatTableSearchParams,
} from "@/utils/formatValues"
import { DrawerFormRef } from "@/components/Pro/ProForm/components/DrawerForm"
import { FieldDateProps } from "@/components/Pro/ProField/components/FieldDate"
import AddAlarmForm from "./components/add"
import EditAlarmForm from "./components/edit"
import { convertTreeNode } from "../BedAllot/utils"
import { DataNode } from "antd/lib/tree"
import { convertFloorTreeNode } from "./utils"
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
		dataIndex: "duration",
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
const data = Array.from({ length: 40 }, (_, i) => {
	return {
		key: i,
		avatar: "i",
		user: MOCK.Random.cname(),
		type: alarmArray[MOCK.Random.integer(0, 5)],
		time: Random.date(),
		duration: "00:12:35",
		nurse: MOCK.Random.cname(),
		status: MOCK.Random.boolean() ? "已处理" : "未处理",
	}
})
const columns: ProTableColumns<any>[] = [
	{
		title: "标识",
		dataIndex: ["member", "avatar"],
		field: "avatar",
		fieldProps: {
			size: 30,
			icon: <UserOutlined />,
		} as any,
	},
	{
		title: "告警用户",
		dataIndex: ["member", "name"],
		width: 130,
		search: {
			label: undefined,
			placeholder: "姓名",
			name: "name",
		},
		read: {
			copyable: true,
		},
	},
	{
		dataIndex: "orgRoomId",
		field: "tree-select",
		hideInTable: true,
		search: {
			name: "roomId",
			label: undefined,
			placeholder: "选择房间",
			request: {
				url: "/orgmgt/room/treeList",
				method: "post",
				transform: (response: any, cache: boolean) => {
					if (cache) return response
					// 数据不规范 需要处理
					if (response)
						return convertFloorTreeNode(response.result, [
							"orgBuildings",
							"orgRooms",
						])
					return []
				},
			},
		} as any,
	},
	{
		title: "告警类型",
		dataIndex: "alarmType",
		field: "select",
		search: {
			label: undefined,
		},
		read: {
			statusList: colorArray,
		},
		fieldProps: {
			options: alarmArray,
		},
	},
	{
		title: "告警时间",
		dataIndex: "alarmTime",
		field: "date",
		width: 160,
		fieldProps: {
			timeFormat: "YYYY/MM/DD HH:mm",
		} as FieldDateProps,
	},
	{
		title: "持续时长",
		dataIndex: "description",
	},
	{
		title: "护管人员",
		width: 100,
		dataIndex: "careWorkerName",
		read: {
			copyable: true,
		},
	},
	{
		title: "处理状态",
		dataIndex: "status",
		field: "select",
		fieldProps: {
			statusList: colorArray,
			options: ["已处理", "未处理"],
		},
	},
]
function AlarmRecord() {
	const addRef = useRef<DrawerFormRef>(null)
	const editRef = useRef<DrawerFormRef>(null)
	const tableRef = useRef<ProTableRef>(null)
	const [editId, setEditId] = useState<string | undefined>(undefined)
	const tableColumns = useMemo(() => {
		return columns.concat({
			title: "操作",
			key: "action",
			width: 250,
			render: () => (
				<Space>
					<Button type='link'>告警处理</Button>
					<Button type='link'>设备详情</Button>
				</Space>
			),
		})
	}, [])
	return (
		<div className='h-full flex flex-col'>
			<ProTable
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
			/>
			<AddAlarmForm name='add alarm form' ref={addRef} />
			<EditAlarmForm name='edit alarm form' ref={editRef} />
		</div>
	)
}
export default memo(AlarmRecord)
