import React, { forwardRef, memo, Ref, useMemo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Checkbox } from "antd"
import { CheckboxGroupProps } from "antd/lib/checkbox"
import { BaseProFieldProps, FieldOptionType, RequestProps } from "../../type"
import useFetchData from "@/hooks/useFetchData"
import { renderStatusFromOption } from "../../../utils"
import { isArray } from "@/utils/validate"

export interface FieldCheckboxProps
	extends BaseProFieldProps,
		CheckboxGroupProps {
	options?: string[] | Array<FieldOptionType>
	/** 使用 tag 渲染文本 */
	showTag: boolean
	request?: RequestProps
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
					rest?.value ?? text,
					options,
					fieldEnum,
					showTag
				)}
			</span>
		)
		if (render) return render(text, { mode, ...rest, fieldEnum, options }, dom)
		return dom
	}
	const formItemDom = <Checkbox.Group options={options} {...rest} />
	if (renderFormItem)
		return renderFormItem(
			text,
			{ mode, ...rest, fieldEnum, options },
			formItemDom
		)
	return formItemDom
}

export default memo(
	withDefaultProps(forwardRef(FieldCheckbox), {
		text: "",
		mode: "read",
		showTag: true,
	})
)
