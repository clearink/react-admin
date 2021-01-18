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
import { sleep } from "@/utils/test"

import AddForm from "./components/add"
import EditForm from "./components/edit"
import { isNullUndefined } from "@/utils/data/validate"
import { ProFormInput, ProFormSelect } from "@/components/Pro/ProForm"
import { FieldText } from "@/components/Pro/ProField"

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
	{
		title: "开放状态",
		dataIndex: "status",
		render(dom, value) {
			return <Switch defaultChecked={value} />
		},
	},
]

function BedAllot() {
	const editRef = useRef<DrawerFormRef>(null)
	const addRef = useRef<DrawerFormRef>(null)
	const tableRef = useRef<ProTableRef>(null)
	const [editId, setEditId] = useState<string | undefined>(undefined)

	const buildingId = useContext(BedAllotContext) // Layout传递过来的楼层ID

	// 外部设置table 的 params 控制数据请求
	const params = { buildingId, pageNo: 1, pageSize: 10 }
	useEffect(() => {
		const tableMethods = tableRef.current
		if (isNullUndefined(buildingId) || !tableMethods) return
		tableMethods.setParams(params)
	}, [buildingId, params])

	const proTableColumns = useMemo(
		() =>
			columns.concat({
				title: "操作",
				dataIndex: "id",
				width: 250,
				search: (
					<ProFormSelect
						label={undefined}
						name='roomId'
						placeholder='房间编号'
						request={{
							url: buildingId
								? "/orgmgt/room/list/queryByBuildingId"
								: undefined,
							params: { id: buildingId },
							method: "get",
							transform: (response, cache) => {
								if (cache) return response
								return response.result.map((item:any) => ({
									label: item.num,
									value: item.id,
								}))
							},
						}}
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
			}),
		[buildingId]
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
					params,
					transform: bsConvertTableList,
				}}
				onCreate={() => {
					addRef.current?.toggle()
				}}
				// onCreate 新增 table 内部
				// onDelete 删除 table 内部
				// onEdit  编辑 属于 table 外部

				onDelete={async (values) => {
					// BedAllotApi.remove()
				}}
			/>

			{/* 编辑 form */}
			<EditForm
				title='床位管理编辑'
				id={editId}
				ref={editRef}
				onFinish={async (values) => {
					await sleep(1000)
					tableRef.current?.reload()
					return true
				}}
			/>

			{/* 新增form */}
			<AddForm
				title='新增床位'
				ref={addRef}
				onFinish={async (values) => {
					console.log(values)
					await sleep(1000)
					tableRef.current?.reload()
					return true
				}}
			/> 
		</div>
	)
}
export default memo(BedAllot)
