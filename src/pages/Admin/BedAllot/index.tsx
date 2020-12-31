import React, { memo, useContext, useRef } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Space, Switch } from "antd"
import { DeleteOutlined, UserOutlined } from "@ant-design/icons"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns, ProTableRef } from "@/components/Pro/ProTable/type"
import useFetchData from "@/hooks/useFetchData"
import BedAllotContext from "./BedAllotContext"
import useEventEffect from "@/hooks/useEventEffect"
import { isUndefined } from "@/utils/validate"
import {
	commonTransformServerData,
	formatTableSearchParams,
} from "@/utils/formatValues"

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
	{
		title: "床垫设备号",
		key: "action",
		width: 250,
		render: () => {
			return (
				<Space>
					<span>
						<UserOutlined />
						住户信息
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

function BedAllot() {
	const buildingId = useContext(BedAllotContext)
	const ref = useRef<ProTableRef>()
	useEventEffect(() => {
		if (isUndefined(buildingId) || !ref.current) return
		const { dispatch, params, actions } = ref.current.changeParams
		dispatch(actions.changeParams({ ...params, buildingId }))
	}, [buildingId])

	return (
		<div className={styles.page_wrap}>
			<ProTable
				bordered
				rowKey='id'
				ref={ref as any}
				columns={columns}
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
		</div>
	)
}
export default memo(BedAllot)
