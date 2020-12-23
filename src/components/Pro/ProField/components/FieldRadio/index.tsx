import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Radio } from "antd"
import { BaseProFieldProps } from "../../type"
import useFetchData from "@/hooks/useFetchData"
import { RadioGroupProps } from "antd/lib/radio"
import { renderStatusFromOption } from "@/components/Pro/utils"

interface FieldRadioProps extends BaseProFieldProps, RadioGroupProps {
	text: string | number
	showTag: boolean
}

function FieldRadio(props: FieldRadioProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldEnum,
		fetchUrl, // 请求
		fetchMethod,
		transform, // 转换
		showTag,
		...rest
	} = props

	const { data } = useFetchData(fetchMethod, fetchUrl) // fetchUrl === undefined 不发送请求

	const options = useMemo(() => {
		if (rest.options) return rest.options // 直接设置的 options 优先级最高
		if (transform) return transform(data, fieldEnum) // 远程请求的第二
		return []
	}, [data, fieldEnum, rest.options, transform])

	if (mode === "read") {
		const dom = (
			<span>
				{renderStatusFromOption(
					rest.value ?? text,
					options,
					fieldEnum,
					showTag
				)}
			</span>
		)
		if (render) return render(text, { mode, ...rest, fieldEnum, options }, dom)
		return dom
	}
	const formItemDom = <Radio.Group options={options} {...rest} />
	if (renderFormItem)
		return renderFormItem(
			text,
			{ mode, ...rest, fieldEnum, options },
			formItemDom
		)
	return formItemDom
}

export default memo(
	withDefaultProps(forwardRef(FieldRadio), {
		text: "",
		mode: "read",
		showTag: true,
	})
)
