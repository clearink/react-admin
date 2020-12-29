import { isArray } from "@/utils/validate"
import { DataNode } from "antd/lib/tree"

export function convertTreeNode(data: any[], childKey: string) {
	return data.reduce((pre, cur) => {
		const ele: DataNode = { title: cur.name, key: cur.id }
		if (isArray(cur[childKey])) {
			ele.children = convertTreeNode(cur[childKey], childKey)
		} else {
			ele.isLeaf = true
		}
		return pre.concat(ele)
	}, [])
}
