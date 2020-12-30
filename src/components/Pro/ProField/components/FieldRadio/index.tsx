import React, { useMemo } from "react"
import { Radio } from "antd"
import { BaseFieldSelectProps, BaseProFieldProps } from "../../type"
import useFetchData, { useFetchDataProps } from "@/hooks/useFetchData"
import { RadioGroupProps } from "antd/lib/radio"
import { renderStatusFromOption } from "@/components/Pro/utils"
import { isArray } from "@/utils/validate"
import { CheckboxValueType } from "antd/lib/checkbox/Group"
import withProField from "@/components/Pro/hocs/withProField"

export interface FieldRadioProps
	extends BaseProFieldProps,
		BaseFieldSelectProps {
	formItemProps?: Omit<RadioGroupProps, "options">
	text?: string | CheckboxValueType[]
	showTag: boolean
	request?: useFetchDataProps
	options?: RadioGroupProps["options"]
}
const defaultFormItemProps: RadioGroupProps = {}
function FieldRadio(props: FieldRadioProps) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldEnum,
		request,
		showTag,
		options: PO,
		formItemProps,
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
			<span>{renderStatusFromOption(text, options, fieldEnum, showTag)}</span>
		)
		if (render) return render(text, { mode, ...rest, fieldEnum, options }, dom)
		return dom
	}

	const editProps = { ...defaultFormItemProps, ...formItemProps, options }
	const formItemDom = <Radio.Group {...editProps} />
	if (renderFormItem)
		return renderFormItem(text, { mode, fieldEnum, ...editProps }, formItemDom)
	return formItemDom
}

export default withProField(FieldRadio, {
	text: "",
	showTag: true,
})
