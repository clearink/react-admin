import React, {
	memo,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import styles from "./style.module.scss"
import { Button, Switch } from "antd"
import { EditOutlined, ProfileOutlined } from "@ant-design/icons"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns, ProTableRef } from "@/components/Pro/ProTable/type"
import BedAllotContext from "./BedAllotContext"
import {
	bsConvertTableList,
	formatTableSearchParams,
} from "@/utils/formatValues"
import { DrawerFormRef } from "@/components/Pro/ProForm/components/DrawerForm"
import AddForm from "./components/add"
import EditForm from "./components/edit"
import { ProFormSelect } from "@/components/Pro/ProForm"
import { FieldText } from "@/components/Pro/ProField"
import BedAllotApi from "@/http/api/pages/BedAllotApi"
import useMemoFetch from "@/hooks/useMemoFetch"

const columns: ProTableColumns<any>[] = [
	{
		title: "床位编号",
		width: 100,
		dataIndex: "num",
		read: <FieldText />,
	},
	{
		title: "入住用户",
		dataIndex: "memberName",
		read: <FieldText copyable />,
	},
	{
		title: "护管人员",
		dataIndex: "careWorkerName",
		read: <FieldText copyable />,
	},
	{
		title: "床垫设备号",
		dataIndex: "deviceNum",
		read: <FieldText copyable />,
	},
]

function BedAllot() {
	const editRef = useRef<DrawerFormRef>(null)
	const addRef = useRef<DrawerFormRef>(null)
	const tableRef = useRef<ProTableRef>(null)
	const [editId, setEditId] = useState<string | undefined>(undefined)

	const { buildingId } = useContext(BedAllotContext) // Layout传递过来的楼层ID

	// 外部设置table 的 params 控制数据请求
	useEffect(() => {
		const tableMethods = tableRef.current
		if (!tableMethods) return
		tableMethods.setParams({ buildingId, pageNo: 1, pageSize: 10 })
	}, [buildingId])

	const [{ data: roomData, loading }, fetchData, _, methods] = useMemoFetch({
		auto: false,
		url: "/orgmgt/room/list/queryByBuildingId",
		params: { id: buildingId },
		transform: (response) => {
			console.log(response)
			return response.result?.map((item: any) => ({
				label: item.num,
				value: item.id,
			}))
		},
	})
	useEffect(() => {
		if (buildingId) fetchData()
		else methods.setData(undefined)
	}, [buildingId, fetchData, methods])
	const proTableColumns = useMemo(
		() =>
			columns.concat(
				{
					title: "开放状态",
					dataIndex: "enabled",
					render(dom, value, record) {
						return (
							<Switch
								checked={value}
								onClick={async () => {
									await BedAllotApi.changeBedStatus({
										enabled: !value,
										id: record.id,
									})
									// 刷新list
									tableRef.current?.reload()
								}}
							/>
						)
					},
				},
				{
					title: "操作",
					dataIndex: "id",
					width: 250,
					search: (
						<ProFormSelect
							label={undefined}
							name='roomId'
							placeholder='房间编号'
							options={roomData}
							loading={loading}
						/>
					),
					render: (dom, id) => {
						return (
							<div>
								<Button icon={<ProfileOutlined />} type='link' size='small'>
									住户信息
								</Button>
								<Button
									onClick={() => {
										setEditId(id)
										editRef.current?.toggle()
									}}
									icon={<EditOutlined />}
									type='link'
									size='small'
								>
									编辑
								</Button>
							</div>
						)
					},
				}
			),
		[loading, roomData]
	)
	return (
		<div className={styles.page_wrap}>
			<ProTable
				bordered
				rowKey='id'
				ref={tableRef}
				title='床位管理'
				columns={proTableColumns}
				onSearch={formatTableSearchParams}
				request={{
					url: "/orgmgt/bed/list",
					method: "post",
					params: { buildingId, pageNo: 1, pageSize: 10 },
					transform: bsConvertTableList,
				}}
				onCreate={() => {
					addRef.current?.toggle()
				}}
				onDelete={async (values) => {
					await BedAllotApi.removeBed({ ids: values })
				}}
			/>

			{/* 编辑 form */}
			<EditForm
				title='床位管理编辑'
				id={editId}
				ref={editRef}
				onFinish={async (values) => {
					await BedAllotApi.edit(values)
					setEditId(undefined)
					tableRef.current?.reload()
					return true
				}}
			/>

			{/* 新增form */}
			<AddForm
				title='新增床位'
				ref={addRef}
				onFinish={async (values) => {
					await BedAllotApi.add(values)
					tableRef.current?.reload()
					return true
				}}
			/>
		</div>
	)
}
export default memo(BedAllot)
