import React, { memo, useContext, useEffect, useMemo, useRef } from "react"
import styles from "./style.module.scss"
import { Button, Space as div, Switch } from "antd"
import { DeleteOutlined, UserOutlined } from "@ant-design/icons"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns, ProTableRef } from "@/components/Pro/ProTable/type"
import BedAllotContext from "./BedAllotContext"
import { isUndefined } from "@/utils/validate"
import {
	commonTransformServerData,
	formatTableSearchParams,
} from "@/utils/formatValues"
import RenderDrawerForm from "@/components/Pro/ProForm/components/DrawerForm/RenderDrawerForm"

const columns: ProTableColumns<any>[] = [
	{
		title: "房间编号",
		width: 160,
		dataIndex: "orgRoomId",
		search: true,
		fieldProps: {
			label: undefined,
			name: "roomId",
			placeholder: "房间编号",
			copyable: true,
			ellipsis: true,
		},
	},
	{
		title: "床位编号",
		width: 100,
		dataIndex: "num",
	},
	{
		title: "入住用户",
		dataIndex: "memberName",
		fieldProps: {
			copyable: true,
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
		title: "床垫设备号",
		dataIndex: "deviceNum",
		fieldProps: {
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
	const buildingId = useContext(BedAllotContext)
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
				render: (...args) => {
					return (
						<div>
							<Button icon={<UserOutlined />} type='link' size='small'>
								住户信息
							</Button>

							<Button
								onClick={() => {
									console.log("设置form", args)
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
				ref={ref as any}
				columns={proTableColumns}
				title='床位管理'
				request={{
					url: "/orgmgt/bed/list",
					method: "post",
					params: { buildingId, pageNo: 1, pageSize: 10 },
				}}
				onSearch={(values) => {
					return formatTableSearchParams(values)
				}}
				transform={commonTransformServerData}
			/>
			<RenderDrawerForm columns={columns} />
		</div>
	)
}
export default memo(BedAllot)
