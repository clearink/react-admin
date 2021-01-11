import { DataNode } from "antd/lib/tree"

// 转换 server data
interface TreeNode extends DataNode {
	value: string | number
}
export function convertDeviceTreeNode(data: any[]) {
	return data.reduce((pre, cur) => {
		const { deviceName, deviceModelNumList } = cur
		const ele: TreeNode = {
			title: deviceName,
			key: deviceName,
			value: deviceName,
		}
		if (deviceModelNumList) {
			ele.children = deviceModelNumList.map((item: any) => ({
				title: item,
				key: `${deviceName}/${item}`,
        value: item,
        isLeaf:true
			}))
			ele.disabled = true
		} else {
			ele.isLeaf = true
		}
		return pre.concat(ele)
	}, [])
}
