import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Select } from "antd"
import { BaseProFieldProps } from "../../type"
import { SelectProps } from "antd/lib/select"
import useFetchData from "@/hooks/useFetchData"
import {
	renderOptionFromEnum,
	renderStatusFromOption,
} from "../../utils/enumUtils"

interface FieldSelectProps
	extends BaseProFieldProps,
		Omit<SelectProps<any[]>, "mode"> {
	selectMode?: SelectProps<any[]>["mode"]
}
/**
 * 1. fieldEnum 是 Array 
 * 
 * 
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

	const dom = useMemo(
		() => <span>{renderStatusFromOption(text, fieldEnum)}</span>,
		[text, fieldEnum]
	)

	const { loading, data } = useFetchData(fetchUrl) // fetchUrl === undefined 不发送请求
	const options = useMemo(() => {
		if (rest.options) return rest.options // 直接设置的 options 优先级最高
		if (transform) return transform(data, fieldEnum) // 远程请求的第二
		return renderOptionFromEnum(fieldEnum)
	}, [data, fieldEnum, rest.options, transform])

	if (mode === "read") {
		if (render) return render(text, { mode, ...rest, fieldEnum, options }, dom)
		return dom
	}
	const formItemDom = (
		<Select loading={loading} mode={selectMode} options={options} {...rest} />
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
		style: { width: 300 },
	})
)
