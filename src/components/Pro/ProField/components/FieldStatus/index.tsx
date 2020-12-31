import React, { memo } from "react"
import {
	BaseFieldSelectProps,
	BaseProFieldProps,
	FieldOptionType,
} from "../../type"
import useFetchData, { useFetchDataProps } from "@/hooks/useFetchData"
import useDeepMemo from "@/hooks/useDeepMemo"
import { isArray } from "@/utils/validate"
import withDefaultProps from "@/hocs/withDefaultProps"
import { renderStatus, transformOptions } from "./utils"

export interface FieldStatusProps extends BaseProFieldProps<FieldStatusProps> {
	text?: string | number | Array<string | number>
	options?: string[] | Array<FieldOptionType>
	/** 渲染方式  "tag" | "badge"*/
	type?: "tag" | "badge"
	request?: useFetchDataProps
	statusList?: string[]
}

/**

	问题1 transform 每次都会改变 需要缓存它吗?
	期望 期望 transform只在 data 变化时调用一次
	暂时先缓存下来
 */
function FieldStatus(props: FieldStatusProps) {
	const {
		text,
		statusList,
		type,
		request,
		options: PO,
		render,
		...rest
	} = props

	const { data } = useFetchData({ cache: true, auto: true, ...request })
	// form.resetFields 会重新执行一次
	// 这是 antd 的设计 no bug
	const options = useDeepMemo(() => {
		if (PO) return transformOptions(PO) // 直接设置的 options 优先级最高
		if (isArray(data)) return data as any
		return []
	}, [data, PO])
	const DOM = <span>{renderStatus(text, options, statusList, type)}</span>
	if (render) return render({ text, ...rest, type, statusList, options }, DOM)
	return DOM
}

export default memo(withDefaultProps(FieldStatus, { text: "", type: "tag" }))
