// big sight avatar 组件
import React, { memo, useCallback } from "react"
import { isArray } from "@/utils/validate"
import { ProFormTreeSelect } from "../../Pro/ProForm"
import { BSFormItemProps } from "../interface"
import { ProFormTreeSelectProps } from "../../Pro/ProForm/components/ProFormTreeSelect"

// TODO:
export type BSTreeSelectProps = BSFormItemProps<ProFormTreeSelectProps>
function BSTreeSelect(props: BSTreeSelectProps) {
	const { initialValue, ...rest } = props
	// 转换从服务器 或者 是从store 中得到的数据
	const handleTransformServerData = useCallback((value, multiple) => {
		if (value && multiple && !isArray(value)) return value.split(",")
		return value
	}, [])
	//TODO 处理 initialValue
	return (
		<ProFormTreeSelect
			transform={handleTransformServerData}
			initialValue={initialValue}
			{...rest}
		/>
	)
}
export default memo(BSTreeSelect)
