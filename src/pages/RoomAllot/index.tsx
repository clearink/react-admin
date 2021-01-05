import React, { memo, useContext, useEffect, useRef } from "react"
import styles from "./style.module.scss"
import { Space, Switch } from "antd"
import { DeleteOutlined, UserOutlined } from "@ant-design/icons"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns, ProTableRef } from "@/components/Pro/ProTable/type"
import BedAllotContext from "../BedAllot/BedAllotContext"
import { isUndefined } from "@/utils/validate"
import {
	commonTransformServerData,
	formatTableSearchParams,
} from "@/utils/formatValues"

// 房间管理
const columns: ProTableColumns<any>[] = [
	{
		title: "房间编号",
		width: 100,
		dataIndex: "num",
		search: { placeholder: "房间编号", label: false },
	},
	{
		title: "入住人数/床位数",
		dataIndex: "livingNum",
		render: (value, record) => {
			console.log(value, record)
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
	{
		title: "操作",
		key: "action",
		width: 300,
		render: () => {
			return (
				<Space>
					<span>
						<UserOutlined />
						查看入住人员
					</span>
					<span>
						<UserOutlined />
						编辑
					</span>
					<span>
						<DeleteOutlined />
						删除
					</span>
				</Space>
			)
		},
	},
]
function RoomAllot() {
	const buildingId = useContext(BedAllotContext)
	const ref = useRef<ProTableRef>()
	useEffect(() => {
		const tableMethods = ref.current
		if (isUndefined(buildingId) || !tableMethods) return
		tableMethods.setParams({ buildingId })
	}, [buildingId])
	return (
		<div className={styles.page_wrap}>
			<ProTable
				bordered
				rowKey='id'
				ref={ref as any}
				columns={columns}
				title='房间管理'
				request={{
					url: "/orgmgt/room/list",
					method: "post",
					params: { buildingId, pageNo: 1, pageSize: 10 },
				}}
				onSearch={formatTableSearchParams}
				transform={commonTransformServerData}
			/>
		</div>
	)
}
export default memo(RoomAllot)
