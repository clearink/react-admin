import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Select } from "antd"
import { enumText, enumToOption } from "./utils"
import { BaseProFieldProps } from "../../type"
import { SelectProps } from "antd/lib/select"
import useFetchData from "@/hooks/useFetchData"

interface FieldSelectProps
	extends BaseProFieldProps,
		Omit<SelectProps<any[]>, "mode"> {
	selectMode?: SelectProps<any[]>["mode"]
}
/**
 * 用 text 去匹配fieldEnum 对象的值   	实现
	transform?: (options?: any[]) => any // 转换options 实现


	需求 1
	如何在transform 中动态修改fieldEnum
	enumText 能否自己实现
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
		...rest
	} = props

	const dom = useMemo(() => <span>{enumText(text, fieldEnum)}</span>, [
		text,
		fieldEnum,
	])

	const { loading, error, data } = useFetchData(fetchUrl) // fetchUrl === undefined 不发送请求
	const options = useMemo(() => {
		if (transform) return transform(data, fieldEnum)
		if (rest.options) return rest.options
		return enumToOption(fieldEnum)
	}, [data, fieldEnum, rest.options, transform])

	if (mode === "read") {
		if (render) return render(text, { mode, ...rest, fieldEnum, options }, dom)
		return dom
	}
	const formItemDom = <Select mode={selectMode} options={options} {...rest} />
	if (renderFormItem)
		renderFormItem(text, { mode, ...rest, fieldEnum, options }, formItemDom)
	return formItemDom
}

export default memo(
	withDefaultProps(forwardRef(FieldSelect), {
		text: "",
		mode: "read",
		allowClear: true,
		style: { width: 300 },
	})
)
