import { CommonServerData } from "@/hooks/useMemoFetch/interface"
import { DataNode } from "antd/lib/tree"

// 转换 floor data
interface TreeNode extends DataNode {
	value: string | number
}
export function convertFloorTreeNode(data: any[], keyList: string[]) {
	return data.reduce((pre, cur) => {
		const { name, num, id } = cur
		const ele: TreeNode = { title: name ?? num, key: id, value: id }
		for (let i = 0; i < keyList.length; i++) {
			const key = keyList[i]
			if (cur[key]) {
				ele.children = convertFloorTreeNode(cur[key], keyList)
				if (i === 0) ele.disabled = true
			}
		}
		return pre.concat(ele)
	}, [])
}

export function convertServerListData(
	response: CommonServerData,
	cache?: boolean
) {
	if (cache) return response
	return response.result?.map((item: any) => ({
		label: item.num,
		value: item.id,
	}))
}
