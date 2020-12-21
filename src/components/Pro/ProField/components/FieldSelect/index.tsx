import React, { forwardRef, memo, Ref, useRef } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Select } from "antd"
import { BaseProFieldProps, FieldOptionType } from "../../type"
import { SelectProps } from "antd/lib/select"
import useFetchData from "@/hooks/useFetchData"
import { renderOriginOptions, renderStatusFromOption } from "../../../utils"
import useDeepMemo from "@/hooks/useDeepMemo"

export interface FieldSelectProps
	extends BaseProFieldProps,
		Omit<SelectProps<any[]>, "mode" | "options"> {
	selectMode?: SelectProps<any[]>["mode"]
	options?: string[] | Array<FieldOptionType>
	textTag: boolean // 是否使用 tag 渲染 text
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

function FieldSelect(props: FieldSelectProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldEnum,
		fetchUrl, // 请求
		transform, // 转换
		selectMode, // select mode
		textTag,
		...rest
	} = props

	const memoTransform = useRef(transform)

	const { loading, data } = useFetchData(fetchUrl) // fetchUrl === undefined 不发送请求

	const options = useDeepMemo(() => {
		if (rest.options) return renderOriginOptions(rest.options) // 直接设置的 options 优先级最高
		if (memoTransform.current) return memoTransform.current(data, fieldEnum) // 远程请求的第二
		return []
	}, [data, fieldEnum, rest.options])
	if (mode === "read") {
		const dom = (
			<span>{renderStatusFromOption(text, options, fieldEnum, textTag)}</span>
		)
		if (render) return render(text, { mode, ...rest, fieldEnum, options }, dom)
		return dom
	}
	const formItemDom = (
		<Select
			loading={loading && options.length === 0}
			mode={selectMode}
			options={options as any} // any script
			{...rest}
		/>
	)
	if (renderFormItem)
		renderFormItem(text, { mode, ...rest, fieldEnum, options }, formItemDom)
	return formItemDom
}

export default memo(
	withDefaultProps(forwardRef(FieldSelect), {
		text: "",
		mode: "read",
		allowClear: true,
		textTag: true,
		style: { width: 300 },
	})
)
