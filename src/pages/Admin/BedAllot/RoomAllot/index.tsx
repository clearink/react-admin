import React, { memo, useContext, useRef } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Space, Switch } from "antd"
import { DeleteOutlined, UserOutlined } from "@ant-design/icons"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns, ProTableRef } from "@/components/Pro/ProTable/type"
import BedAllotContext from "../BedAllotContext"
import useEventEffect from "@/hooks/useEventEffect"
import { isUndefined } from "@/utils/validate"
import {
	commonTransformServerData,
	formatTableSearchParams,
} from "@/utils/formatValues"

const columns: ProTableColumns<any>[] = [
	{
		title: "房间编号",
		width: 100,
		dataIndex: "num",
		search: true,
		fieldProps: {
			label: false,
			placeholder: "房间编号",
		},
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
