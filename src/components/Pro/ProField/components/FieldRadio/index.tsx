import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Radio } from "antd"
import { enumText, enumToOption } from "../FieldSelect/utils"
import { BaseProFieldProps } from "../../type"
import useFetchData from "@/hooks/useFetchData"
import { RadioGroupProps } from "antd/lib/radio"

interface FieldRadioProps extends BaseProFieldProps, RadioGroupProps {
	text: string | number
}
/**
 * 用 text 去匹配fieldEnum 对象的值   
	transform?: (options?: any[]) => any // 转换options
 */

function FieldRadio(props: FieldRadioProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldEnum,
		fetchUrl, // 请求
		transform, // 转换
		...rest
	} = props

	const dom = useMemo(() => <span>{enumText(text, fieldEnum)}</span>, [
		text,
		fieldEnum,
	])

	const { data } = useFetchData(fetchUrl) // fetchUrl === undefined 不发送请求
	const options = useMemo(() => {
		if (transform) return transform(data, fieldEnum) // 有transform 则使用它转换的数据
		if (rest.options) return rest.options // 有 options 直接使用 options
		return enumToOption(fieldEnum) // 转换 fieldEnum
	}, [data, fieldEnum, rest.options, transform])

	if (mode === "read") {
		if (render) return render(text, { mode, ...rest, fieldEnum, options }, dom)
		return dom
	}
	const formItemDom = <Radio.Group options={options} {...rest} />
	if (renderFormItem)
		renderFormItem(text, { mode, ...rest, fieldEnum, options }, formItemDom)
	return formItemDom
}

export default memo(
	withDefaultProps(forwardRef(FieldRadio), {
		text: "",
		mode: "read",
	})
)
