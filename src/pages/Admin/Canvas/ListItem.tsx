import React from "react"
import { selectors } from "@/store/reducers/test"
import useCacheSelector from "@/hooks/useCacheSelector"
import { Button } from "antd"
import { actions } from "@/store/reducers/list"
import useUnwrapAsyncThunk from "@/hooks/useUnwrapAsyncThunk"
interface IProps {
	id: number
}
function ListItem(props: IProps) {
	const test = useCacheSelector(selectors.selectById, props.id)
	const unwrap = useUnwrapAsyncThunk()
	return (
		<div>
			{test?.id} ---------- {test?.val}
			<Button
				onClick={() => {
					console.log(12)
					unwrap(actions.fetchList())
				}}
			>
				123112
			</Button>
		</div>
	)
}

export default ListItem
