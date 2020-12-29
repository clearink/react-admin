import React, { Ref, useMemo } from "react"
import { Checkbox } from "antd"
import { CheckboxGroupProps } from "antd/lib/checkbox"
import { BaseProFieldProps, FieldOptionType } from "../../type"
import useFetchData, { useFetchDataProps } from "@/hooks/useFetchData"
import { renderStatusFromOption } from "../../../utils"
import { isArray } from "@/utils/validate"
import withProField from "@/components/Pro/hocs/withProField"

export interface FieldCheckboxProps extends BaseProFieldProps {
	formItemProps?: Omit<CheckboxGroupProps, "options">
	text: CheckboxGroupProps["value"]
	showTag: boolean
	request?: useFetchDataProps
	options?: string[] | Array<FieldOptionType>
}
function FieldCheckbox(props: FieldCheckboxProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldEnum,
		request, // 请求
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
	const formItemDom = (
		<Checkbox.Group {...rest} {...formItemProps} options={options} />
	)
	if (renderFormItem)
		return renderFormItem(
			text,
			{ mode, ...rest, ...formItemProps, fieldEnum, options },
			formItemDom
		)
	return formItemDom
}

export default withProField(FieldCheckbox, {
	showTag: true,
})
