import React from "react"
import { selectors } from "@/store/reducers/test"
import useCacheSelector from "@/hooks/useCacheSelector"
import { Button } from "antd"
import GetBoundAction from "@/utils/GetBoundAction"
import { actions } from "@/store/reducers/list"
interface IProps {
	id: number
}
const boundFetchList = GetBoundAction(actions)
function ListItem(props: IProps) {
	const test = useCacheSelector(selectors.selectById, props.id)
	return (
		<div>
			{test?.id} ---------- {test?.val}
			<Button
				onClick={() => {
					console.log(12)
					boundFetchList.fetchList()
				}}
			>
				123112
			</Button>
		</div>
	)
}

export default ListItem
