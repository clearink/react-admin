import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Checkbox } from "antd"
import { CheckboxGroupProps } from "antd/lib/checkbox"
import { BaseProFieldProps, FieldOptionType } from "../../type"
import useFetchData from "@/hooks/useFetchData"
import { renderStatusFromOption } from "../../utils/enumUtils"

interface FieldCheckboxProps extends BaseProFieldProps, CheckboxGroupProps {
	options?: string[] | Array<FieldOptionType>
	textTag: boolean
}

function FieldCheckbox(props: FieldCheckboxProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldEnum,
		fetchUrl, // 请求
		transform, // 转换
		textTag,
		...rest
	} = props

	const { data } = useFetchData(fetchUrl) // fetchUrl === undefined 不发送请求

	const options = useMemo(() => {
		if (rest.options) return rest.options // 直接设置的 options 优先级最高
		if (transform) return transform(data, fieldEnum) // 远程请求的第二
		return []
	}, [data, fieldEnum, rest.options, transform])
	const dom = useMemo(
		() => (
			<span>{renderStatusFromOption(text, options, fieldEnum, textTag)}</span>
		),
		[text, fieldEnum, options, textTag]
	)
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
		textTag: true,
	})
)
