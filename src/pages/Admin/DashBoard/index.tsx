import React, { useState } from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { colorArray } from "@/components/Pro/utils/FieldEnumUtil"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { sleep } from "@/utils/test"

const data = Array.from({ length: 20 }, (_, i) => {
	return {
		index: i,
		title: `106.14.98.1${i}4`,
		labels: 10,
		state: colorArray[Math.floor(Math.random() * 10) % 4],
		created_at: 30,
	}
})
const columns: ProTableColumns<any>[] = [
	{
		dataIndex: "index",
		field: "orderNum",
		width: 48,
	},
	{
		title: "标题",
		dataIndex: "title",
		width: "30%",
	},
	{
		title: "状态",
		dataIndex: "state",
		search: true,
		field: "select",
		fieldProps: {
			tooltip: "1232121321312",
			fetchUrl: "/sys/dict/getDictItems/MEMBER_TYPE",
			fieldEnum:colorArray,
			transform: (oo,fieldEnum) => {
				console.log(fieldEnum);
				if (!oo) return []
				return oo.result.map((item: any) => ({
					label: item.text,
					value: item.value,
				}))
			},
		},
	},
	{
		title: "标签",
		dataIndex: "labels",
		search: true,
		field: "digit",
	},
	{
		title: "创建时间",
		key: "created_at",
		dataIndex: "created_at",
		search: true,
		field: "date",
	},
]
function WorkPlace(props: IBaseProps) {
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-20 flex-auto m-10'>
				<ProTable
					bordered
					dataSource={data}
					columns={columns}
					rowKey='index'
					// 搜索请求
					onSearch={async () => {
						await sleep(1000)
					}}
				/>
			</main>
		</div>
	)
}

export default WorkPlace
