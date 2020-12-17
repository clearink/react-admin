import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Checkbox } from "antd"
import { CheckboxGroupProps } from "antd/lib/checkbox"
import { enumText, enumToOption } from "../FieldSelect/utils"
import { BaseProFieldProps } from "../../type"
import useFetchData from "@/hooks/useFetchData"

interface FieldCheckboxProps extends BaseProFieldProps, CheckboxGroupProps {}
/**
 * 用 text 去匹配fieldEnum 对象的值   
	transform?: (options?: any[]) => any // 转换options
 */

function FieldCheckbox(props: FieldCheckboxProps, ref: Ref<any>) {
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
	const formItemDom = <Checkbox.Group options={options} {...rest} />
	if (renderFormItem)
		renderFormItem(text, { mode, ...rest, fieldEnum, options }, formItemDom)
	return formItemDom
}

export default memo(
	withDefaultProps(forwardRef(FieldCheckbox), {
		text: "",
		mode: "read",
	})
)
