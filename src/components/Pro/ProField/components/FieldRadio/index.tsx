import React, { memo, useMemo } from "react"
import { Radio } from "antd"
import { BaseFieldSelectProps, BaseProFieldProps } from "../../type"
import useFetchData, { useFetchDataProps } from "@/hooks/useFetchData"
import { RadioGroupProps } from "antd/lib/radio"
import { renderStatusFromOption } from "@/components/Pro/utils"
import { isArray } from "@/utils/validate"
import { CheckboxValueType } from "antd/lib/checkbox/Group"
import withProField from "@/components/Pro/hocs/withProField"
import withDefaultProps from "@/hocs/withDefaultProps"

export interface FieldRadioProps
	extends BaseProFieldProps<FieldRadioProps>,
		BaseFieldSelectProps {
	text?: string | CheckboxValueType[]
	showTag: boolean
	request?: useFetchDataProps
	options?: RadioGroupProps["options"]
}
const defaultFormItemProps: RadioGroupProps = {}
function FieldRadio(props: FieldRadioProps) {
	const {
		text,
		render,
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

	const DOM = (
		<span>{renderStatusFromOption(text, options, fieldEnum, showTag)}</span>
	)

	if (render) return render({ text, ...rest, showTag, fieldEnum, options }, DOM)
	return DOM
}

export default memo(withDefaultProps(FieldRadio, { text: "", showTag: true }))
