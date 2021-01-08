import React, { memo } from "react"
import classNames from "classnames"
import { Space } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import ProTable from "@/components/Pro/ProTable"
import styles from "./style.module.scss"
import {
	commonTransformServerData,
	formatTableSearchParams,
} from "@/utils/formatValues"

const columns: ProTableColumns<any>[] = [
	{
		title: "设备编号",
		dataIndex: "num",
		width: 100,
		search: {
			label: false,
			placeholder: "名称/编号",
		},
		read: {
			copyable: true,
			ellipsis: true,
		},
	},
	{
		title: "SIM卡号(ICCID)",
		dataIndex: "modelNum",
	},
	// {
	// 	title: "使用状态",
	// 	width: 200,
	// 	dataIndex: "status",
	// 	field: "select",
	// 	fieldProps: {
	// 		statusList: colorArray,
	// 		options: ["启用", "停用"],
	// 	},
	// },
	{
		title: "使用人/房间",
		dataIndex: "producerName",
		read: {
			copyable: true,
		},
	},
	{
		title: "领出人",
		dataIndex: "supplierName",
	},
	{
		title: "操作",
		key: "action",
		render: () => (
			<Space>
				<span>
					<UserOutlined />
					查看人员信息
				</span>
				<span>
					<UserOutlined />
					编辑
				</span>
				<span>
					<UserOutlined />
					删除
				</span>
			</Space>
		),
	},
]

// 设备管理
function Device() {
	return (
		<div className='bg-white h-full'>
			<ProTable
				request={{
					url: "/orgmgt/device/list",
					method: "post",
				}}
				columns={columns}
				rowKey='id'
				// 搜索请求
				onSearch={formatTableSearchParams}
				// 删除
				// onDelete={async (values) => {
				// 	await http.delete("/membermgt/member/deleteBatch", {
				// 		params: { ids: values.map((item: any) => item.id).join(",") },
				// 	})
				// }}
				// transform 需要设置 当前页数,pageSize, 总数 数据
				transform={commonTransformServerData}
				title={{ title: "设备管理", tooltip: "各种设备管理" }}
			/>
		</div>
	)
}
export default memo(Device)
