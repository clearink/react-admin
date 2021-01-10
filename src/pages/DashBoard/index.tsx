import React, { useState } from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { colorArray } from "@/components/Pro/ProField/components/FieldStatus/utils"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import useCountDown from "@/components/Pro/hooks/count-down"
import useInterval from "@/components/Pro/hooks/interval"
import useMemoFetch from "@/hooks/useMemoFetch"
import { convertTreeNode } from "../BedAllot/utils"
import ProFormUploadList from "@/components/Pro/ProForm/components/ProFormUploadList"
import { Button, Form, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { actions, headers } from "@/http/api/utils/file"
import { BSAvatar } from "@/components/BigSight"
import { ProFormAvatar } from "@/components/Pro/ProForm"
import BSUploadList from "@/components/BigSight/Form/BSUploadList"
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
					transform={bsConvertTableList}
					title={{ title: "高级表格", tooltip: "这是一个标题提示" }}
				/> */}
				<BaseForm onFinish={console.log}>
					<BSUploadList name='file' label='fileList' initialValue={'123,13221'} />
				</BaseForm>
			</main>
		</div>
	)
}

export default WorkPlace
