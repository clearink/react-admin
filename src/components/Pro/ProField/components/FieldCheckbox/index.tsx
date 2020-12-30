import React, { Ref, useMemo } from "react"
import { Checkbox } from "antd"
import { CheckboxGroupProps } from "antd/lib/checkbox"
import {
	BaseFieldSelectProps,
	BaseProFieldProps,
	FieldOptionType,
} from "../../type"
import useFetchData, { useFetchDataProps } from "@/hooks/useFetchData"
import { renderStatusFromOption } from "../../../utils"
import { isArray } from "@/utils/validate"
import withProField from "@/components/Pro/hocs/withProField"

export interface FieldCheckboxProps
	extends BaseProFieldProps<FieldCheckboxProps>,
		BaseFieldSelectProps {
	text: CheckboxGroupProps["value"]
	showTag: boolean
	request?: useFetchDataProps
	options?: string[] | Array<FieldOptionType>
}

function FieldCheckbox(props: FieldCheckboxProps, ref: Ref<any>) {
	const {
		text,
		render,
		fieldEnum,
		request, // 请求
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

	const DOM = <>{renderStatusFromOption(text, options, fieldEnum, showTag)}</>

	if (render) return render({ text, showTag, ...rest, fieldEnum, options }, DOM)
	return DOM
}

export default withProField(FieldCheckbox, {
	showTag: true,
})
