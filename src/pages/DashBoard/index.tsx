import React from "react"
import { Divider } from "antd"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import {
	ProFormInput,
	ProFormSelect,
	ProFormTable,
} from "@/components/Pro/ProForm"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import { TableFormColumns } from "@/components/Pro/ProForm/components/ProFormTable/interface"

const columns: TableFormColumns[] = [
	{
		title: "id",
		dataIndex: "id",
		edit: <ProFormInput />,
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
				<BaseForm onFinish={console.log}>
					<ProFormTable
						name='list'
						label='list'
						addType='modal'
						columns={columns}
					/>
				</BaseForm>

				<Divider />
			</main>
		</div>
	)
}

export default WorkPlace
