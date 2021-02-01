import { isArray } from "@/utils/data/validate"
import { DataNode } from "antd/lib/tree"

// 转换 server data
interface TreeNode extends DataNode {
	value: string | number
}
export function convertTreeNode(data: any[], childKey: string) {
	return data.reduce((pre, cur) => {
		const ele: TreeNode = { title: cur.name, key: cur.id, value: cur.id }
		if (isArray(cur[childKey])) {
			ele.children = convertTreeNode(cur[childKey], childKey)
			ele.disabled = true
		} else {
			ele.isLeaf = true
		}
		return pre.concat(ele)
	}, [])
}

export function convertRoomTree(data: any[], childKey: string) {
	return data.reduce((pre, cur) => {
		const ele: TreeNode = { title: cur.text, key: cur.id, value: cur.id }
		if (isArray(cur[childKey])) {
			ele.children = convertRoomTree(cur[childKey], childKey)
			ele.disabled = true
		} else {
			ele.isLeaf = true
		}
		return pre.concat(ele)
	},[])
}
