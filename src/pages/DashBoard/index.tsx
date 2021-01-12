import React from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { colorArray } from "@/components/Pro/ProField/components/FieldStatus/utils"
import { ProFormSelect, TableForm } from "@/components/Pro/ProForm"
import { FieldAvatar, FieldDate, FieldStatus } from "@/components/Pro/ProField"
const columns: ProTableColumns<any>[] = [
	{
		dataIndex: "avatar",
		title: "头像",
		read: <FieldAvatar />,
	},
	{
		title: "性别",
		dataIndex: "gender",
		search: <ProFormSelect />,
		// 三种情形都需要的数据 read edit search
		read: <FieldStatus statusList={colorArray} renderType='badge' />,
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
		read: <FieldDate timeFormat='YYYY-MM-DD' />,
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
