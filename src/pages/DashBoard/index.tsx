import React from "react"
import { Button, Divider } from "antd"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import {
	ProForm,
	ProFormInput,
	ProFormSelect,
	ProFormTable,
} from "@/components/BigSight"
import { TableFormColumns } from "@/components/Pro/ProForm/components/ProFormTable/interface"

const columns: TableFormColumns[] = [
	{
		title: "id",
		dataIndex: "id",
		hideInTable: true,
	},
	{
		title: "type",
		dataIndex: "type",
		edit: <ProFormSelect options={["1", "2", "3"]} initialValue='1' />,
	},
	{
		title: "title",
		dataIndex: "title",
		edit: <ProFormInput />,
	},
]
function WorkPlace() {
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-10 pb-0 flex-auto m-10 '>
				<ProForm onFinish={console.log}>
					<ProFormTable columns={columns} name='112' />
				</ProForm>

				<Divider />
			</main>
		</div>
	)
}

export default WorkPlace
