import React, { forwardRef, memo, Ref, useEffect, useRef } from "react"
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
	showTag: boolean // 是否使用 tag 渲染 text
	fetch: boolean // 是否需要进行网络请求
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
		transform, // 转换
		selectMode, // select mode
		showTag,
		fetch,
		fetchUrl, // 请求
		fetchMethod,
		...rest
	} = props

	const { loading, data } = useFetchData(fetchMethod, fetchUrl, fetch) // fetchUrl === undefined 不发送请求

	const memoTransform = useRef(transform)
	useEffect(() => {
		memoTransform.current = transform
	}, [transform])

	// form.resetFields 会重新执行一次
	// 这是 antd 的设计 no bug
	const options = useDeepMemo(() => {
		if (rest.options) return renderOriginOptions(rest.options) // 直接设置的 options 优先级最高
		if (memoTransform.current) return memoTransform.current(data, fieldEnum) // 远程请求的第二
		return []
	}, [data, fieldEnum, rest.options])

	if (mode === "read") {
		const dom = (
			<span>
				{renderStatusFromOption(
					rest?.value ?? text,
					options,
					fieldEnum,
					showTag
				)}
			</span>
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
		return renderFormItem(
			text,
			{ mode, ...rest, fieldEnum, options },
			formItemDom
		)
	return formItemDom
}

export default memo(
	withDefaultProps(forwardRef(FieldSelect), {
		text: "",
		mode: "read",
		allowClear: true,
		showTag: true,
		fetch: true,
		style: { width: 300 },
		fetchMethod: "get",
	})
)
