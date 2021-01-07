import React, {
	memo,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import styles from "./style.module.scss"
import { Button, Space, Switch } from "antd"
import {
	DeleteOutlined,
	EditOutlined,
	ProfileOutlined,
	UserOutlined,
} from "@ant-design/icons"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns, ProTableRef } from "@/components/Pro/ProTable/type"
import BedAllotContext from "../BedAllot/BedAllotContext"
import { isUndefined } from "@/utils/validate"
import {
	commonTransformServerData,
	formatTableSearchParams,
} from "@/utils/formatValues"
import { AddFormRef } from "@/components/PepLife/AddForm"
import { EditFormRef } from "@/components/PepLife/EditForm"
import RoomAddForm from "./components/add"
import RoomEditForm from "./components/edit"
import { sleep } from "@/utils/test"

// 房间管理
const columns: ProTableColumns<any>[] = [
	{
		title: "房间编号",
		dataIndex: "num",
		search: { placeholder: "房间编号", label: false },
	},
	{
		title: "入住人数/床位数",
		dataIndex: "livingNum",
		render: (value, record) => {
			return `${value}/${record.bedNum}`
		},
	},
	{
		title: "护管人员",
		dataIndex: "careWorkerName",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "开放状态",
		dataIndex: "enabled",
		render(value) {
			return <Switch defaultChecked={value} />
		},
	},
]
function RoomAllot() {
	const editRef = useRef<EditFormRef>(null)
	const addRef = useRef<AddFormRef>(null)
	const tableRef = useRef<ProTableRef>(null)
	const [editId, setEditId] = useState<string | undefined>(undefined)

	const buildingId = useContext(BedAllotContext)

	useEffect(() => {
		const tableMethods = tableRef.current
		if (isUndefined(buildingId) || !tableMethods) return
		tableMethods.setParams({ buildingId })
	}, [buildingId])

	const tableColumns = useMemo(() => {
		return columns.concat({
			title: "操作",
			key: "action",
			
			render: (record) => {
				return (
					<div>
						<Button icon={<ProfileOutlined />} type='link' size='small'>
							查看入住人员
						</Button>
						<Button
							onClick={() => {
								setEditId(record.id)
								editRef.current?.toggle()
							}}
							icon={<EditOutlined />}
							type='link'
							size='small'
						>
							编辑
						</Button>
						<Button icon={<DeleteOutlined />} type='link' size='small'>
							删除
						</Button>
					</div>
				)
			},
		})
	}, [])

	return (
		<div className={styles.page_wrap}>
			<ProTable
				bordered
				rowKey='id'
				ref={tableRef}
				columns={tableColumns}
				title='房间管理'
				onSearch={formatTableSearchParams}
				transform={commonTransformServerData}
				request={{
					url: "/orgmgt/room/list",
					method: "post",
					params: { buildingId, pageNo: 1, pageSize: 10 },
				}}
				onCreate={() => {
					addRef.current?.toggle()
				}}
			/>
			{/* 新增form */}
			<RoomAddForm
				title='新增房间'
				ref={addRef}
				onFinish={async (values) => {
					console.log(values)
					await sleep(1000)
					tableRef.current?.reload()
					return true
				}}
			/>
			{/* 编辑 form request 在 RoomEditForm 中传入 */}
			<RoomEditForm
				title='房间管理编辑'
				id={editId}
				ref={editRef}
				onFinish={async (values) => {
					await sleep(1000)
					tableRef.current?.reload()
					return true
				}}
			/>
		</div>
	)
}
export default memo(RoomAllot)
