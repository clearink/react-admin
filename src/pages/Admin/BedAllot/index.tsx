import React, {
	cloneElement,
	memo,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import styles from "./style.module.scss"
import { Button, message, Space as div, Switch } from "antd"
import { UserOutlined } from "@ant-design/icons"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns, ProTableRef } from "@/components/Pro/ProTable/type"
import BedAllotContext from "./BedAllotContext"
import { isUndefined } from "@/utils/validate"
import {
	commonTransformServerData,
	formatTableSearchParams,
} from "@/utils/formatValues"
import RenderDrawerForm from "@/components/Pro/ProForm/components/DrawerForm/RenderDrawerForm"
import DrawerForm, {
	DrawerFormRef,
} from "@/components/Pro/ProForm/components/DrawerForm"
import { ProFormInput } from "@/components/Pro/ProForm"
import { sleep } from "@/utils/test"

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
	const formRef = useRef<DrawerFormRef | undefined>(undefined)
	const addRef = useRef<DrawerFormRef | undefined>(undefined)
	const buildingId = useContext(BedAllotContext)
	const [editId, setEditId] = useState<string | undefined>(undefined)
	const ref = useRef<ProTableRef>()
	useEffect(() => {
		const tableMethods = ref.current
		if (isUndefined(buildingId) || !tableMethods) return
		tableMethods.setParams({ buildingId })
	}, [buildingId])

	const proTableColumns = useMemo(
		() =>
			columns.concat({
				title: "床垫设备号",
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
									formRef.current?.toggle?.()
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
					console.log("新增数据")
				}}
				// onCreate 新增 table 内部
				// onDelete 删除 table 内部
				// onEdit  编辑 属于 table 外部

				// onDelete={async(values)=>{
				// 	console.log(values)
				// }}
			/>
			{/* 外部如何能控制呢? */}
			<RenderDrawerForm
				request={{
					url: "/orgmgt/bed/member/queryByBedId",
					params: { id: editId },
					method: "get",
				}}
				id={editId}
				title='床位管理编辑'
				ref={formRef}
				columns={columns}
			/>



			
			<DrawerForm
				ref={addRef}
				trigger={null}
				title='新增床位'
				onFinish={async (values) => {
					try {
						await sleep(1000)
					} catch (error) {
						message.error("新增失败")
					}
				}}
			>
				<ProFormInput label='床位名称' name='name' />
				<ProFormInput label='房间名称' name='room' />
				<ProFormInput label='楼层名称' name='floor' />
			</DrawerForm>
		</div>
	)
}
export default memo(BedAllot)
