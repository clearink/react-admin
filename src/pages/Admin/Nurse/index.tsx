import React, { memo } from "react"
import classNames from "classnames"
import { Space } from "antd"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { colorArray } from "@/components/Pro/ProField/components/FieldStatus/utils"
import styles from "./style.module.scss"
import {
	commonTransformServerData,
	formatTableSearchParams,
} from "@/utils/formatValues"
import { TextProps } from "antd/lib/typography/Text"

// 护管管理

const columns: ProTableColumns<any>[] = [
	{
		title: "头像",
		dataIndex: "avatar",
		field: "avatar",
		width: 80,
	},
	{
		title: "姓名",
		dataIndex: "name",
		search: true,
		width: 140,
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "性别",
		dataIndex: "gender",
	},
	{
		title: "年龄",
		dataIndex: "age",
	},
	{
		title: "身份证号",
		width: 200,
		dataIndex: "cardNum",
		fieldProps: {
			copyable: true,
			ellipsis: true,
		} as TextProps,
	},
	{
		title: "联系电话",
		dataIndex: "mobile",
		fieldProps: {
			copyable: true,
		},
	},
	{
		title: "职务",
		dataIndex: "position",
	},
	{
		title: "账号状态",
		dataIndex: "enabled",
		search: true,
		field: "select",
		fieldProps: {
			statusList: colorArray,
			options: [
				{ label: "正常", value: true },
				{ label: "离职", value: false },
			],
		},
	},
	{
		title: "操作",
		key: "action",
		width: 300,
		render: () => (
			<Space>
				<span>护理分配</span>
				<span>认证信息</span>
				<span>编辑</span>
				<span>删除</span>
			</Space>
		),
	},
]
function Nurse() {
	return (
		<div className='h-full flex flex-col'>
			<ProTable
				request={{
					url: "/orgmgt/careWorker/list",
					method: "post",
				}}
				columns={columns as any}
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
				title={{ title: "护管管理", tooltip: "护工人员管理" }}
			/>
		</div>
	)
}
export default memo(Nurse)
