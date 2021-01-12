import React, { memo } from "react"
import { BaseProFieldProps, FieldOptionType } from "../../type"
import useMemoFetch, { UseMemoFetchProps } from "@/hooks/useMemoFetch"
import useDeepMemo from "@/hooks/useDeepMemo"
import { isArray } from "@/utils/validate"
import withDefaultProps from "@/hocs/withDefaultProps"
import { renderStatus } from "./utils"

export interface FieldTreeStatusProps
	extends BaseProFieldProps<FieldTreeStatusProps> {
	text?: string | number | Array<string | number>
	options?: string[] | Array<FieldOptionType>
	/** 渲染方式  "tag" | "badge"*/
	renderType?: "tag" | "badge"
	request?: UseMemoFetchProps
	statusList?: string[]
}

/**
 * 回显树型结构的status
 */
function FieldTreeStatus(props: FieldTreeStatusProps) {
	const {
		text,
		statusList,
		renderType,
		request,
		options: PO,
		render,
		...rest
	} = props

	const [{ data, loading }] = useMemoFetch(request ?? {})
	// form.resetFields 会重新执行一次
	// 这是 antd 的设计 no bug
	const options = useDeepMemo(() => {
		if (PO) return PO
		if (isArray(data)) return data as any
		return []
	}, [data, PO])
	// console.log("tree select", text, options, statusList, renderType)
	const DOM = <span>{renderStatus(text, options, statusList, renderType)}</span>
	if (render)
		return render({ text, ...rest, renderType, statusList, options }, DOM)
	return DOM
}

export default memo(
	withDefaultProps(FieldTreeStatus, { text: "", renderType: "tag" })
)
