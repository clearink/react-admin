import React, { forwardRef, memo, Ref } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Select } from "antd"
import { BaseProFieldProps, FieldOptionType } from "../../type"
import { SelectProps } from "antd/lib/select"
import useFetchData, { useFetchDataProps } from "@/hooks/useFetchData"
import { renderOriginOptions, renderStatusFromOption } from "../../../utils"
import useDeepMemo from "@/hooks/useDeepMemo"
import { isArray } from "@/utils/validate"
import withProField from "@/components/Pro/hocs/withProField"
import FilterValue from "@/utils/FilterValue"

export interface FieldSelectProps extends BaseProFieldProps {
	formItemProps?: Omit<SelectProps<any[]>, "options">
	options?: string[] | Array<FieldOptionType>
	showTag: boolean // 是否使用 tag 渲染 text
	request?: useFetchDataProps
	value?: string | number | Array<string | number>
}

/**
 * 1. fieldEnum 是 Array 
 * 
 * 
	需求 1
	如何在transform 中动态修改fieldEnum
	enumText 能否自己实现


	问题1 transform 每次都会改变 需要缓存它吗?
	期望 期望 transform只在 data 变化时调用一次
	暂时先缓存下来
 */
const defaultFormItemProps = {
	allowClear: true,
	showTag: true,
	style: { width: 300 },
}
function FieldSelect(props: FieldSelectProps) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldEnum,
		showTag,
		request,
		options: PO,
		formItemProps,
		...rest
	} = props

	const { loading, data } = useFetchData({ cache: true, ...request })
	// form.resetFields 会重新执行一次
	// 这是 antd 的设计 no bug
	const options = useDeepMemo(() => {
		if (PO) return renderOriginOptions(PO) // 直接设置的 options 优先级最高
		if (isArray(data)) return data as any
		return []
	}, [data, fieldEnum, PO])

	if (mode === "read") {
		const dom = (
			<span>{renderStatusFromOption(text, options, fieldEnum, showTag)}</span>
		)
		if (render) return render(text, { mode, ...rest, fieldEnum, options }, dom)
		return dom
	}

	const formItemDom = (
		<Select
			loading={loading && options.length === 0}
			{...defaultFormItemProps}
			{...FilterValue(rest, ["value"])}
			{...formItemProps}
			options={options as any} // any script
		/>
	)
	if (renderFormItem)
		return renderFormItem(
			text,
			{ mode, ...rest, ...formItemProps, fieldEnum, options },
			formItemDom
		)
	return formItemDom
}

export default withProField(FieldSelect, {
	text: "",
	formItemProps: defaultFormItemProps,
})
