import React, { useEffect } from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { actions } from "@/store/reducers/list"
import useUnwrapAsyncThunk from "@/hooks/useUnwrapAsyncThunk"
function TableList(props: IBaseProps) {
	const unWrap = useUnwrapAsyncThunk()
	useEffect(() => {
		unWrap(actions.fetchList()).then((res) => {
			console.log(res[0].title)
		})
	}, [unWrap])
	return (
		<div className='w-full min-h-full'>
			<PageHeaderWrap title='查询表格' />
			<Link to={`/admin/list/table-list/${12312}`}>列表某一项详情</Link>
		</div>
	)
}

export default TableList
