import React, { memo } from "react"
import classNames from "classnames"
import { Space } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import ProTable from "@/components/Pro/ProTable"
import {
	bsConvertTableList,
	formatTableSearchParams,
} from "@/utils/formatValues"
import { FieldText } from "@/components/Pro/ProField"

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
		title: "使用人/房间",
		dataIndex: "useText",
	},
	{
		title: "领出人",
		dataIndex: "leadPerson",
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
					params: { pageNo: 1, pageSize: 10 },
					method: "post",
					transform: bsConvertTableList,
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
				title={{ title: "设备管理", tooltip: "各种设备管理" }}
			/>
		</div>
	)
}
export default memo(Device)
