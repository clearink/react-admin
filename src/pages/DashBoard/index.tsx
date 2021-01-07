import React from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import {
	commonTransformServerData,
	formatTableSearchParams,
} from "@/utils/formatValues"
import { colorArray } from "@/components/Pro/ProField/components/FieldStatus/utils"
import http from "@/http"
import ProFormGroup from "@/components/Pro/ProForm/components/ProFormGroup"
import { ProFormAvatar, ProFormInput } from "@/components/Pro/ProForm"
import ProSkeleton from "@/components/Pro/ProSkeleton"
import DrawerTrigger from "@/components/DrawerTrigger"
import { Button, Form, Input } from "antd"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import ModalForm from "@/components/Pro/ProForm/components/ModalForm"
import { sleep } from "@/utils/test"
import DrawerForm from "@/components/Pro/ProForm/components/DrawerForm"
import ProFormBsAvatar from "@/components/BigSight/ProFormBsAvatar"
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
				{/* <ProTable
					request={{
						url: "/membermgt/member/list",
						params: { parameter: { column: "createTime", order: "desc" } },
						method: "post",
					}}
					columns={columns as any}
					rowKey='id'
					// 搜索请求
					onSearch={formatTableSearchParams}
					// 删除
					onDelete={async (values) => {
						await http.delete("/membermgt/member/deleteBatch", {
							params: { ids: values.map((item: any) => item.id).join(",") },
						})
					}}
					// transform 需要设置 当前页数,pageSize, 总数 数据
					transform={commonTransformServerData}
					title={{ title: "高级表格", tooltip: "这是一个标题提示" }}
				/> */}
				<BaseForm
					onFinish={(values) => {
						console.log(values)
					}}
				>
					<ProFormBsAvatar label='头像' name='avatar' />
				</BaseForm>
			</main>
		</div>
	)
}

export default WorkPlace
