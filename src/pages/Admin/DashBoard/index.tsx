import React, { useCallback, useState } from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { colorArray } from "@/components/Pro/utils/FieldEnumUtil"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { FieldDateTimeProps } from "@/components/Pro/ProField/components/FieldDate/FieldDateTime"
import { formatTableSearchParams } from "@/utils/formatValues"
import { Button } from "antd"
import http from "@/http"
import DrawerForm from "@/components/Pro/ProForm/components/DrawerForm"
import { ProFormText } from "@/components/Pro/ProForm"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import { sleep } from "@/utils/test"
import useBoolean from "@/hooks/useBoolean"

const columns: ProTableColumns<any>[] = [
	{
		dataIndex: "updateTime",
		title: "更新时间",
		field: "date",
		sorter: {
			multiple: 1,
		},
		fieldProps: {
			timeFormat: "YYYY-MM-DD hh:mm",
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
		fieldProps: {
			copyable: true,
			// copyable: { tooltips: false },
		},
	},
	{
		title: "昵称",
		dataIndex: "nickName",
	},
	{
		title: "经验",
		sorter: {
			multiple: 2,
		},
		dataIndex: ["memberAsset", "experience"],
	},
]
function WorkPlace(props: IBaseProps) {
	const handleOnSearch = useCallback((values) => {
		// 1. 过滤 undefined removeEmpty
		// 2. 模糊查询 修改
		// 3. dispatch 改变 params
		return formatTableSearchParams(values)
	}, [])
	const handleTransform = useCallback((OD, dispatch, actions) => {
		if (!OD) return // 转换请求的数据
		dispatch(actions.changeData(OD.result.records))
		dispatch(actions.changeCurrent(OD.result.current))
		dispatch(actions.changePageSize(OD.result.size))
		dispatch(actions.changeTotal(OD.result.total))
	}, [])
	const [loading, toggle] = useBoolean()
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-10 pb-0 flex-auto m-10 '>
				<Button onClick={toggle}>aasadss</Button>
				{/* <ProTable
					loading={loading}
					request={{
						url: "/membermgt/member/list",
						params: { parameter: { column: "createTime", order: "desc" } },
						method: "post",
					}}
					columns={columns}
					rowKey='id'
					// 搜索请求
					onSearch={handleOnSearch}
					// 删除
					// onDelete={async (values) => {
					// 	await http.delete("/membermgt/member/deleteBatch", {
					// 		params: { ids: values.map((item: any) => item.id).join(",") },
					// 	})
					// }}
					// transform 需要设置 当前页数,pageSize, 总数 数据
					transform={handleTransform}
					title={{ title: "高级表格", tooltip: "这是一个标题提示" }}
				/> */}
				<DrawerForm
				 title={{title:"新建表单",tooltip:"色开发商的地方是"}}
					trigger={<Button>DrawerForm</Button>}
					onFinish={async (v) => {
						await sleep(1000)
						console.log(v)
					}}
				>
					<ProFormText name='a123' label='a123' tooltip='12312' />
					<ProFormText name='a123' label='a123' />
					<ProFormText name='a123' label='a123' />
					<ProFormText name='a123' label='a123' />
				</DrawerForm>
			</main>
		</div>
	)
}

export default WorkPlace
