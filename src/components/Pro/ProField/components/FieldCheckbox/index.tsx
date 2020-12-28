import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Checkbox } from "antd"
import { CheckboxGroupProps } from "antd/lib/checkbox"
import { BaseProFieldProps, FieldOptionType } from "../../type"
import useFetchData, { useFetchDataProps } from "@/hooks/useFetchData"
import { renderStatusFromOption } from "../../../utils"
import { isArray } from "@/utils/validate"

export interface FieldCheckboxProps
	extends BaseProFieldProps,
		Omit<CheckboxGroupProps, "value"> {
	options?: string[] | Array<FieldOptionType>
	/** 使用 tag 渲染文本 */
	showTag: boolean
	request?: useFetchDataProps
	value: CheckboxGroupProps["value"]
}

function FieldCheckbox(props: FieldCheckboxProps, ref: Ref<any>) {
	const {
		mode,
		render,
		renderFormItem,
		fieldEnum,
		request, // 请求
		showTag,
		options: PO,
		value,
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
			<span>
				{renderStatusFromOption(value ?? "", options, fieldEnum, showTag)}
			</span>
		)
		if (render) return render(value, { mode, ...rest, fieldEnum, options }, dom)
		return dom
	}
	const formItemDom = (
		<Checkbox.Group options={options} value={value} {...rest} />
	)
	if (renderFormItem)
		return renderFormItem(
			value,
			{ mode, ...rest, fieldEnum, options },
			formItemDom
		)
	return formItemDom
}

export default memo(
	withDefaultProps(forwardRef(FieldCheckbox), {
		mode: "read",
		showTag: true,
	})
)
