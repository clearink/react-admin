import React, {
	memo,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import { Button, Space } from "antd"
import { EditOutlined, UserOutlined } from "@ant-design/icons"
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

const columns: ProTableColumns<any>[] = [
	{
		title: "设备编号",
		dataIndex: "num",
		width: 90,
		// search: <ProFormInput placeholder='名称/编号' label={undefined} />,
		read: <FieldText ellipsis copyable />,
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
		title: "使用人/房间",
		dataIndex: "useText",
	},
	{
		title: "领出人",
		dataIndex: "leadPerson",
	},
]

// 设备管理
function Device() {
	const { deviceId } = useContext(DeviceContext)
	const tableRef = useRef<ProTableRef>(null)
	const addRef = useRef<AddFormRef>(null)
	const editRef = useRef<EditFormRef>(null)
	const [editId, setEditId] = useState<any>(null)

	// 床位关联 ref
	const bedRef = useRef<AddFormRef>(null)
	const [deviceNum, setDeviceNum] = useState<any>(null)

	const userRef = useRef<AddFormRef>(null)

	useEffect(() => {
		console.log(deviceId)
		tableRef.current?.setParams({
			deviceType: deviceId,
			pageNo: 1,
			pageSize: 10,
		})
	}, [deviceId])

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
					<Button
						type='link'
						size='small'
						icon={<UserOutlined />}
						onClick={() => {
							userRef.current?.toggle()
							setDeviceNum(record.id)
						}}
					>
						人员关联
					</Button>
					<Button
						type='link'
						size='small'
						icon={<UserOutlined />}
						onClick={() => {
							bedRef.current?.toggle()
							setDeviceNum(record.num)
						}}
					>
						床位关联
					</Button>
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
				deviceNum={deviceNum}
				ref={bedRef}
				onFinish={async (values) => {
					console.log(values)
					return true
				}}
			/>
			{/* 人员关联 */}
			<UserConnectForm
				deviceNum={deviceNum}
				ref={userRef}
				onFinish={async (values) => {
					console.log(values)
					return true
				}}
			/>
		</div>
	)
}
export default memo(Device)
