import React, { useMemo } from "react"
import { TreeSelect } from "antd"
import { BaseProFieldProps } from "@/components/Pro/ProField/type"
import withFormItem from "@/components/Pro/hocs/withFormItem"
import { TreeSelectProps } from "antd/lib/tree-select"
import useMemoFetch, { useFetchDataProps } from "@/hooks/useMemoFetch"

export interface ProFormTreeSelectProps<T = any> extends TreeSelectProps<T> {
	render?: BaseProFieldProps<ProFormTreeSelectProps>["render"]
	value?: TreeSelectProps<T>["value"]
	/** 转换value */
	transform?: (data: any, multiple?: boolean) => TreeSelectProps<T>["value"]
	request?: useFetchDataProps
}
function ProFormTreeSelect(props: ProFormTreeSelectProps) {
	const {
		render,
		treeData: propsData,
		transform,
		value: propsValue,
		request,
		...rest
	} = props

	// 远程请求数据
	const [{ data, loading }] = useMemoFetch({ cache: true, ...request })
	
	const treeData = useMemo(() => {
		if (propsData) return propsData
		if (data) return data
	}, [propsData, data])

	// 转换一下数据
	const value = useMemo(() => {
		return transform?.(propsValue, rest.multiple) ?? propsValue
	}, [propsValue, rest.multiple, transform])

	const DOM = (
		<TreeSelect treeData={treeData} loading={loading} value={value} {...rest} />
	)
	if (render) return render(rest, DOM)
	return DOM
}

export default withFormItem<ProFormTreeSelectProps>(ProFormTreeSelect, {
	allowClear: true,
	placeholder: "请输入",
	dropdownStyle: { maxHeight: 400, overflow: "auto" },
})
