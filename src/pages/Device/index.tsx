import React, {
	memo,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import { Button, message, Space } from "antd"
import { EditOutlined, PieChartOutlined, UserOutlined } from "@ant-design/icons"
import { ProTableColumns, ProTableRef } from "@/components/Pro/ProTable/type"
import ProTable from "@/components/Pro/ProTable"
import {
	bsConvertTableList,
	formatTableSearchParams,
} from "@/utils/formatValues"
import { FieldStatus, FieldText } from "@/components/Pro/ProField"
import DeviceContext from "./DeviceContext"
import { AddFormRef } from "@/components/BigSight/Form/AddForm"
import { EditFormRef } from "@/components/BigSight/Form/EditForm"
import DeviceApi from "@/http/api/pages/DeviceApi"
import DeviceAddForm from "./add"
import DeviceEditForm from "./edit"
import BedConnectForm from "./BedConnect"
import UserConnectForm from "./UserConnect"
import { ProFormInput } from "@/components/BigSight"

export interface DeviceItem {
	id: string
	num: string
	deviceType: string
}

const columns: ProTableColumns<any>[] = [
	{
		title: "设备编号",
		dataIndex: "num",
		width: 90,
		search: (
			<ProFormInput
				placeholder='名称/编号'
				name='nameOrNum'
				label={undefined}
			/>
		),
		read: <FieldText ellipsis copyable />,
	},
	{
		title: "设备名称",
		dataIndex: "name",
	},
	{
		title: "SIM卡号(ICCID)",
		dataIndex: "modelNum",
	},
	{
		title: "使用状态",
		dataIndex: "useStatus",
		read: (
			<FieldStatus
				renderType='badge'
				options={[
					{
						value: true,
						label: "启用",
					},
					{
						value: false,
						label: "未分配",
					},
				]}
				statusList={["#4bd863", "#666666"]}
			/>
		),
	},
	{
		title: "使用人/床位",
		dataIndex: "useText",
	},
	{
		title: "领出人",
		dataIndex: "leadPerson",
	},
]

// 设备管理
function Device() {
	const { deviceType } = useContext(DeviceContext)
	const tableRef = useRef<ProTableRef>(null)
	const addRef = useRef<AddFormRef>(null)
	const editRef = useRef<EditFormRef>(null)
	const [editId, setEditId] = useState<any>(null)

	// 床位关联 ref
	const bedRef = useRef<AddFormRef>(null)

	// 选择的设备
	const [checkedDevice, setCheckedDevice] = useState<null | DeviceItem>(null)

	const userRef = useRef<AddFormRef>(null)

	useEffect(() => {
		tableRef.current?.setParams({
			deviceType,
			pageNo: 1,
			pageSize: 10,
		})
	}, [deviceType])

	const handleCreate = () => {
		addRef.current?.toggle()
	}
	const handleEdit = (id: string) => {
		setEditId(id)
		editRef.current?.toggle()
	}
	const tableColumns = useMemo(() => {
		return columns.concat({
			title: "操作",
			key: "action",
			render: (_, record) => (
				<Space>
					{record.deviceType === "BED" ? (
						<Button
							type='link'
							size='small'
							icon={<PieChartOutlined />}
							onClick={() => {
								bedRef.current?.toggle()
								setCheckedDevice(record)
							}}
						>
							床位关联
						</Button>
					) : (
						<Button
							type='link'
							size='small'
							icon={<UserOutlined />}
							onClick={() => {
								userRef.current?.toggle()
								setCheckedDevice(record)
							}}
						>
							人员关联
						</Button>
					)}
					<Button
						type='link'
						size='small'
						icon={<EditOutlined />}
						onClick={() => handleEdit(record.id)}
					>
						编辑
					</Button>
				</Space>
			),
		})
	}, [])
	return (
		<div className='bg-white h-full'>
			<ProTable
				ref={tableRef}
				request={{
					url: "/orgmgt/device/list",
					params: { pageNo: 1, pageSize: 10 },
					method: "post",
					transform: bsConvertTableList,
				}}
				columns={tableColumns}
				rowKey='id'
				// 搜索请求
				onSearch={formatTableSearchParams}
				onCreate={handleCreate}
				// 删除
				onDelete={async (ids) => {
					await DeviceApi.DeviceDelete({ ids })
				}}
				// transform 需要设置 当前页数,pageSize, 总数 数据
				title={{ title: "设备管理", tooltip: "各种设备管理" }}
			/>
			<DeviceAddForm
				ref={addRef}
				onFinish={async (values) => {
					await DeviceApi.DeviceAdd(values)
					tableRef.current?.reload()
					return true
				}}
			/>
			<DeviceEditForm
				ref={editRef}
				id={editId}
				onFinish={async (values) => {
					await DeviceApi.DeviceEdit(values)
					setEditId(null)
					tableRef.current?.reload()
					return true
				}}
			/>
			{/* 床位关联 */}
			<BedConnectForm
				deviceItem={checkedDevice}
				ref={bedRef}
				onFinish={async (values) => {
					const { data } = await DeviceApi.BedConnect({
						deviceId: checkedDevice!.id,
						...values,
					})
					message.success(data?.message)
					tableRef.current?.reload()
					return true
				}}
			/>
			{/* 人员关联 */}
			<UserConnectForm
				deviceItem={checkedDevice}
				ref={userRef}
				onFinish={async () => {
					tableRef.current?.reload()
					return true
				}}
			/>
		</div>
	)
}
export default memo(Device)
