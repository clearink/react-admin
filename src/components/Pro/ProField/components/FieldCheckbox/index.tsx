import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Checkbox } from "antd"
import { CheckboxGroupProps } from "antd/lib/checkbox"
import { BaseProFieldProps } from "../../type"
import useFetchData from "@/hooks/useFetchData"
import {
	renderOptionFromEnum,
	renderStatusFromOption,
} from "../../utils/enumUtils"

interface FieldCheckboxProps extends BaseProFieldProps, CheckboxGroupProps {}

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

	const { data } = useFetchData(fetchUrl) // fetchUrl === undefined 不发送请求

	const options = useMemo(() => {
		if (rest.options) return rest.options // 直接设置的 options 优先级最高
		if (transform) return transform(data, fieldEnum) // 远程请求的第二
		return renderOptionFromEnum(fieldEnum)
	}, [data, fieldEnum, rest.options, transform])

	if (mode === "read") {
		const dom = <span>{renderStatusFromOption(text, fieldEnum)}</span>
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
