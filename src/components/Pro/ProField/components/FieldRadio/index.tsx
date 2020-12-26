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
	value?: string | number
	showTag: boolean
	request?: RequestProps
}

function FieldRadio(props: FieldRadioProps, ref: Ref<any>) {
	const {
		value,
		mode,
		render,
		renderFormItem,
		fieldEnum,
		request,
		showTag,
		options: PO,
		...rest
	} = props

	const { data } = useFetchData(request) // fetchUrl === undefined 不发送请求

	const options = useMemo(() => {
		if (PO) return PO // 直接设置的 options 优先级最高
		if (isArray(data)) return data as any
		return []
	}, [data, PO])

	if (mode === "read") {
		const dom = (
			<span>{renderStatusFromOption(value, options, fieldEnum, showTag)}</span>
		)
		if (render) return render(value, { mode, ...rest, fieldEnum, options }, dom)
		return dom
	}
	const formItemDom = <Radio.Group options={options} {...rest} />
	if (renderFormItem)
		return renderFormItem<Partial<FieldRadioProps>>(
			value,
			{ mode, ...rest, fieldEnum, options },
			formItemDom
		)
	return formItemDom
}

export default memo(
	withDefaultProps(forwardRef(FieldRadio), {
		value: "",
		mode: "read",
		showTag: true,
	})
)
