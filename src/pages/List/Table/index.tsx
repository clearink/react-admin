import React from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"
import PageHeaderWrap from "@/components/PageHeaderWrap"

function TableList(props: IBaseProps) {
	return (
		<div className='w-full min-h-full'>
			<PageHeaderWrap title='查询表格' />
			<Link to={`/list/table-list/${12312}`}>列表某一项详情</Link>
		</div>
	)
}

export default TableList
