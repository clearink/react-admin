import React, { memo, useEffect, useState } from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { colorArray } from "@/components/Pro/utils/FieldEnumUtil"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { sleep } from "@/utils/test"
import { Button, Space, Tag } from "antd"

let data = [
	{
		id: 624748504,
		number: 6689,
		title: "🐛 [BUG]yarn install命令 antd2.4.5会报错",
		labels: [{ name: "bug", color: "error" }],
		state: "open",
		locked: false,
		comments: 1,
		created_at: "2020-05-26T09:42:56Z",
		updated_at: "2020-05-26T10:03:02Z",
		closed_at: null,
		author_association: "NONE",
		user: "chenshuai2144",
		avatar:
			"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
	},
	{
		id: 624691229,
		number: 6688,
		title: "🐛 [BUG]无法创建工程npm create umi",
		labels: [{ name: "bug", color: "error" }],
		state: "open",
		locked: false,
		comments: 0,
		created_at: "2020-05-26T08:19:22Z",
		updated_at: "2020-05-26T08:19:22Z",
		closed_at: null,
		author_association: "NONE",
		user: "chenshuai2144",
		avatar:
			"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
	},
	{
		id: 624674790,
		number: 6685,
		title: "🧐 [问题] build 后还存在 es6 的代码（Umi@2.13.13）",
		labels: [{ name: "question", color: "success" }],
		state: "closed",
		locked: false,
		comments: 0,
		created_at: "2020-05-26T07:54:25Z",
		updated_at: "2020-05-26T07:54:25Z",
		closed_at: null,
		author_association: "NONE",
		user: "chenshuai2144",
		avatar:
			"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
	},
	{
		id: 624620220,
		number: 6683,
		title: "2.3.1版本如何在业务页面修改头部状态",
		labels: [{ name: "question", color: "success" }],
		state: "closed",
		locked: false,
		comments: 2,
		created_at: "2020-05-26T05:58:24Z",
		updated_at: "2020-05-26T07:17:39Z",
		closed_at: null,
		author_association: "NONE",
		user: "chenshuai2144",
		avatar:
			"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
	},
	{
		id: 624592471,
		number: 6682,
		title: "hideChildrenInMenu设置后，子路由找不到了",
		labels: [{ name: "bug", color: "error" }],
		state: "open",
		locked: false,
		comments: 2,
		created_at: "2020-05-26T04:25:59Z",
		updated_at: "2020-05-26T08:00:51Z",
		closed_at: null,
		author_association: "NONE",
		user: "chenshuai2144",
		avatar:
			"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
	},
]
const columns: ProTableColumns<any>[] = [
	{
		dataIndex: "id",
		hideInTable: true,
	},
	{
		title: "标题",
		tooltip: "标题过长会自动收缩",
		dataIndex: "title",
		width: 120,
		fieldProps: {
			ellipsis: true,
			copyable: true,
		},
	},
	{
		title: "状态",
		dataIndex: "state",
		search: true,
		field: "select",
		fieldProps: {
			fieldEnum: colorArray,
			options: [
				{ label: "open", value: "open" },
				{ label: "closed", value: "closed" },
			],
		},
	},
	{
		title: "标签",
		dataIndex: "labels",
		search: true,
		render: (_, record) => (
			<Space>
				{record.labels.map(({ name, color }: any) => (
					<Tag color={color} key={name}>
						{name}
					</Tag>
				))}
			</Space>
		),
	},
	{
		title: "创建时间",
		key: "created_at",
		dataIndex: "created_at",
		search: true,
		field: "date",
	},
	{
		title: "操作",
		key: "option",
		field: "option",
		render: (value, record, i, action) => {
			return (
				<Space>
					<Button
						onClick={() => {
							action.clearSelected()
						}}
					>
						清空选中
					</Button>

					<span>2</span>
					<span>3</span>
					<span>4</span>
				</Space>
			)
		},
	},
]
function WorkPlace(props: IBaseProps) {
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-20 flex-auto m-10'>
				<ProTable
					bordered
					fetchUrl='/task/taskDesign/list'
					dataSource={data}
					columns={columns}
					rowKey='id'
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
