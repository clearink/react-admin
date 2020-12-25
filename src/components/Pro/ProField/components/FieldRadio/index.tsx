import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Radio } from "antd"
import { BaseProFieldProps, RequestProps } from "../../type"
import useFetchData from "@/hooks/useFetchData"
import { RadioGroupProps } from "antd/lib/radio"
import { renderStatusFromOption } from "@/components/Pro/utils"
import { isArray } from "@/utils/validate"

export interface FieldRadioProps
	extends BaseProFieldProps,
		Omit<RadioGroupProps, "name"> {
	radioName?: RadioGroupProps["name"]
	text?: string | number
	showTag: boolean
	request?: RequestProps
}

function FieldRadio(props: FieldRadioProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldEnum,
		request,
		showTag,
		...rest
	} = props

	const { data } = useFetchData(request) // fetchUrl === undefined 不发送请求

	const options = useMemo(() => {
		if (rest.options) return rest.options // 直接设置的 options 优先级最高
		if (isArray(data)) return data as any
		return []
	}, [data, rest.options])

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
		return renderFormItem<Partial<FieldRadioProps>>(
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
