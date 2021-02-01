import { isArray } from "@/utils/data/validate"
import { DataNode } from "antd/lib/tree"

// 转换 floor data
interface TreeNode extends DataNode {
	value: string | number
}
export function convertFloorRoomTree(data: any[], childKey: string) {
	return data.reduce((pre, cur) => {
		const ele: TreeNode = { title: cur.text, key: cur.id, value: cur.id }
		if (isArray(cur[childKey])) {
			ele.children = convertFloorRoomTree(cur[childKey], childKey)
		} else {
			ele.isLeaf = true
		}
		return pre.concat(ele)
	}, [])
}
