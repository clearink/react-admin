import React, { useState } from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { colorArray } from "@/components/Pro/utils/FieldEnumUtil"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { sleep } from "@/utils/test"
import { FieldDateTimeProps } from "@/components/Pro/ProField/components/FieldDate/FieldDateTime"
const columns: ProTableColumns<any>[] = [
	{
		dataIndex: "updateTime",
		title: "更新时间",
		field: "dateTime",
		fieldProps: {
			timeFormat: "MM-DD hh:mm",
		} as FieldDateTimeProps,
	},
	{
		title: "会员类型",
		dataIndex: "memberType",
		field: "select",
		search: true,
		fieldProps: {
			fieldEnum: colorArray,
			request: {
				url: "/sys/dict/getDictItems/MEMBER_TYPE",
				transform: (oo) => {
					if (!oo) return []
					return oo.result.map((item: any) => ({
						label: item.text,
						value: item.value,
					}))
				},
			},
		},
	},
	{
		title: "账号",
		dataIndex: "username",
		search: true,
	},
	{
		title: "昵称",
		dataIndex: "nickName",
	},
	{
		title: "经验",
		dataIndex: ["memberAsset", "experience"],
	},
]
function WorkPlace(props: IBaseProps) {
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-10 pb-0 flex-auto m-10 '>
				<ProTable
					request={{
						url: {
							url: "/membermgt/member/list",
							params: { parameter: { column: "createTime", order: "desc" } },
						},
						method: "post",
					}}
					columns={columns}
					rowKey='id'
					// 搜索请求
					onSearch={async (values, dispatch, actions) => {
						// 1. 过滤 undefined
						// 2. dispatch 改变 params
						console.log(values)
						dispatch(actions.changeParams(values))
					}}
					transform={(OD, dispatch, actions) => {
						if (!OD) return // 转换请求的数据
						dispatch(actions.changeData(OD.result.records))
						dispatch(actions.changeCurrent(OD.result.current))
						dispatch(actions.changePageSize(OD.result.size))
						dispatch(actions.changeTotal(OD.result.total))
					}}
					title={{ title: "高级表格", tooltip: "这是一个标题提示" }}
				/>
			</main>
		</div>
	)
}

export default WorkPlace
