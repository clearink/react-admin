import React from "react"
import { Select } from "antd"
import {
	BaseFieldSelectProps,
	BaseProFieldProps,
	FieldOptionType,
} from "../../type"
import { SelectProps } from "antd/lib/select"
import useFetchData, { useFetchDataProps } from "@/hooks/useFetchData"
import { renderOriginOptions, renderStatusFromOption } from "../../../utils"
import useDeepMemo from "@/hooks/useDeepMemo"
import { isArray } from "@/utils/validate"
import withProField from "@/components/Pro/hocs/withProField"

export interface FieldSelectProps
	extends BaseProFieldProps<FieldSelectProps>,
		BaseFieldSelectProps {
	text?: string | number | Array<string | number>
	options?: string[] | Array<FieldOptionType>
	/** 是否使用 tag 渲染 text 默认=true */
	showTag?: boolean
	request?: useFetchDataProps
}

/**

	问题1 transform 每次都会改变 需要缓存它吗?
	期望 期望 transform只在 data 变化时调用一次
	暂时先缓存下来
 */
function FieldSelect(props: FieldSelectProps) {
	const {
		text,
		fieldEnum,
		showTag,
		request,
		options: PO,
		render,
		...rest
	} = props

	const { data } = useFetchData({
		cache: true,
		auto: true,
		...request,
	})
	// form.resetFields 会重新执行一次
	// 这是 antd 的设计 no bug
	const options = useDeepMemo(() => {
		if (PO) return renderOriginOptions(PO) // 直接设置的 options 优先级最高
		if (isArray(data)) return data as any
		return []
	}, [data, fieldEnum, PO])
	const DOM = (
		<span>{renderStatusFromOption(text, options, fieldEnum, showTag)}</span>
	)
	if (render) return render({ text, ...rest, showTag, fieldEnum, options }, DOM)
	return DOM
}

export default withProField(FieldSelect, {
	text: "",
})
