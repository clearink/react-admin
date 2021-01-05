import React, {
	memo,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import styles from "./style.module.scss"
import { Button, Form, Input, message, Space as div, Switch } from "antd"
import { UserOutlined } from "@ant-design/icons"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns, ProTableRef } from "@/components/Pro/ProTable/type"
import BedAllotContext from "./BedAllotContext"
import { isUndefined } from "@/utils/validate"
import {
	commonTransformServerData,
	formatTableSearchParams,
} from "@/utils/formatValues"
import { DrawerFormRef } from "@/components/Pro/ProForm/components/DrawerForm"
import { sleep } from "@/utils/test"

import AddForm from "./add"
import EditForm from "./edit"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import { ProFormInput } from "@/components/Pro/ProForm"
const columns: ProTableColumns<any>[] = [
	{
		title: "房间编号",
		width: 160,
		dataIndex: "orgRoomId",
		search: {
			label: undefined,
			name: "roomId",
			placeholder: "房间编号",
		},
		read: {
			copyable: true,
			ellipsis: true,
		},
	},
	{
		title: "床位编号",
		width: 100,
		dataIndex: "num",
		edit: {
			width: "lg",
		},
	},
	{
		title: "入住用户",
		dataIndex: "memberName",
		read: {
			copyable: true,
		},
	},
	{
		title: "护管人员",
		dataIndex: "careWorkerName",
		read: {
			copyable: true,
		},
	},
	{
		title: "床垫设备号",
		dataIndex: "deviceNum",
		read: {
			copyable: true,
		},
	},
	{
		title: "开放状态",
		dataIndex: "status",
		render(value) {
			return <Switch defaultChecked={value} />
		},
	},
]

function BedAllot() {
	const editRef = useRef<DrawerFormRef>(undefined)
	const addRef = useRef<DrawerFormRef>(undefined)

	const buildingId = useContext(BedAllotContext) // Layout传递过来的楼层ID

	const [editId, setEditId] = useState<string | undefined>(undefined)

	// 外部设置table 的 params 控制数据请求
	const ref = useRef<ProTableRef>()
	useEffect(() => {
		const tableMethods = ref.current
		if (isUndefined(buildingId) || !tableMethods) return
		tableMethods.setParams({ buildingId })
	}, [buildingId])

	const proTableColumns = useMemo(
		() =>
			columns.concat({
				title: "操作",
				key: "action",
				width: 250,
				render: (record) => {
					return (
						<div>
							<Button icon={<UserOutlined />} type='link' size='small'>
								住户信息
							</Button>

							<Button
								onClick={() => {
									setEditId(record.id)
									editRef.current?.toggle()
								}}
								icon={<UserOutlined />}
								type='link'
								size='small'
							>
								编辑
							</Button>
							<Button icon={<UserOutlined />} type='link' size='small'>
								删除
							</Button>
						</div>
					)
				},
			}),
		[]
	)
	return (
		<div className={styles.page_wrap}>
			<ProTable
				bordered
				rowKey='id'
				ref={ref}
				title='床位管理'
				columns={proTableColumns}
				onSearch={formatTableSearchParams}
				transform={commonTransformServerData}
				request={{
					url: "/orgmgt/bed/list",
					method: "post",
					params: { buildingId, pageNo: 1, pageSize: 10 },
				}}
				onCreate={() => {
					addRef.current?.toggle()
				}}
				// onCreate 新增 table 内部
				// onDelete 删除 table 内部
				// onEdit  编辑 属于 table 外部

				// onDelete={async(values)=>{
				// 	console.log(values)
				// }}
			/>
			{/* 外部如何能控制呢? */}

			{/* 编辑 form */}
			<EditForm
				title='床位管理编辑'
				id={editId}
				ref={editRef}
				request={{
					url: "/orgmgt/bed/member/queryByBedId",
					params: { id: editId },
					method: "get",
				}}
				onFinish={async () => {
					await sleep(1000)
					return true
				}}
			/>

			{/* 新增form */}
			<AddForm
				title='新增床位'
				ref={addRef}
				onFinish={async (values) => {
					await sleep(1000)
					return true
				}}
			/>
		</div>
	)
}
export default memo(BedAllot)
