import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Radio } from "antd"
import { BaseProFieldProps } from "../../type"
import useFetchData from "@/hooks/useFetchData"
import { RadioGroupProps } from "antd/lib/radio"
import {
	renderOptionFromEnum,
	renderStatusFromOption,
} from "../../utils/enumUtils"

interface FieldRadioProps extends BaseProFieldProps, RadioGroupProps {
	text: string | number
}

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

	const dom = useMemo(
		() => <span>{renderStatusFromOption(text, fieldEnum)}</span>,
		[text, fieldEnum]
	)

	const { data } = useFetchData(fetchUrl) // fetchUrl === undefined 不发送请求


	const options = useMemo(() => {
		if (rest.options) return rest.options // 直接设置的 options 优先级最高
		if (transform) return transform(data, fieldEnum) // 远程请求的第二
		return renderOptionFromEnum(fieldEnum)
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
