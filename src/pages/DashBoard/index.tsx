import React from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { colorArray } from "@/components/Pro/ProField/components/FieldStatus/utils"
import { TableForm } from "@/components/Pro/ProForm"
const columns: ProTableColumns<any>[] = [
	{
		dataIndex: "avatar",
		title: "头像",
		field: "avatar",
	},
	{
		title: "性别",
		dataIndex: "gender",
		field: "select",
		search: true,
		// 三种情形都需要的数据 read edit search
		read: {
			statusList: colorArray,
			renderType: "badge",
		},
		fieldProps: {
			options: ["男", "女"],
		},
	},
	{
		title: "昵称",
		dataIndex: "nickName",
	},
	{
		title: "生日",
		dataIndex: "birthday",
		field: "date",
		read: {
			timeFormat: "YYYY-MM-DD",
		} as any,
	},
]
function WorkPlace(props: IBaseProps) {
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-10 pb-0 flex-auto m-10 '>
				<div>ProFormUploadList</div>

				<TableForm />
			</main>
		</div>
	)
}

export default WorkPlace
