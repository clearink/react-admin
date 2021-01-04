import React from "react"
import { Select } from "antd"
import { SelectProps } from "antd/lib/select"
import withFormItem from "../../hocs/withFormItem"
import { BaseProFieldProps } from "../../ProField/type"
import useMemoFetch, { useFetchDataProps } from "@/hooks/useMemoFetch"
import useDeepMemo from "@/hooks/useDeepMemo"
import { transformOptions } from "../../ProField/components/FieldStatus/utils"
import { isArray } from "@/utils/validate"
import FilterValue from "@/utils/FilterValue"

// form.resetFields 会重新执行一次
// 这是 antd 的设计 no bug
export interface ProFormSelectProps
	extends Omit<SelectProps<any[]>, "options"> {
	render?: BaseProFieldProps<ProFormSelectProps>["render"]
	options?: string[] | Array<{ label: string; value: any }>
	value?: SelectProps<any[]>["value"]
	request?: useFetchDataProps
}

function ProFormSelect(props: ProFormSelectProps) {
	const { request, options: PO, render, ...rest } = props

	const [data] = useMemoFetch(request ?? {})

	const options = useDeepMemo(() => {
		if (PO) return transformOptions(PO) // 直接设置的 options 优先级最高
		if (isArray(data)) return data as any
		return []
	}, [data, PO])

	const DOM = (
		<Select {...FilterValue(rest, ["statusList"] as any)} options={options} />
	)
	if (render) return render({ ...rest, options }, DOM)
	return DOM
}
export default withFormItem<ProFormSelectProps>(ProFormSelect, {
	allowClear: true,
})
