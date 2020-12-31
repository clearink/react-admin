import React, { useCallback } from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import ProTable from "@/components/Pro/ProTable"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import { formatTableSearchParams } from "@/utils/formatValues"
import { colorArray } from "@/components/Pro/ProField/components/FieldStatus/utils"
import http from "@/http"

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
		fieldProps: {
			statusList: colorArray,
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
		fieldProps: {
			timeFormat: "YYYY-MM-DD",
		} as any,
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
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-10 pb-0 flex-auto m-10 '>
				<ProTable
					request={{
						url: "/membermgt/member/list",
						params: { parameter: { column: "createTime", order: "desc" } },
						method: "post",
					}}
					columns={columns as any}
					rowKey='id'
					// 搜索请求
					onSearch={handleOnSearch}
					// 删除
					onDelete={async (values) => {
						await http.delete("/membermgt/member/deleteBatch", {
							params: { ids: values.map((item: any) => item.id).join(",") },
						})
					}}
					// transform 需要设置 当前页数,pageSize, 总数 数据
					transform={handleTransform}
					title={{ title: "高级表格", tooltip: "这是一个标题提示" }}
				/>
			</main>
		</div>
	)
}

export default WorkPlace
