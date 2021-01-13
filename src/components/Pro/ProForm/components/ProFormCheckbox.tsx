import React from "react"
import { Checkbox } from "antd"
import { CheckboxGroupProps } from "antd/lib/checkbox"
import withFormItem from "../../hocs/withFormItem"
import { BaseProFieldProps } from "../../ProField/type"
import useMemoFetch, { UseMemoFetchProps } from "@/hooks/useMemoFetch"
import useDeepMemo from "../../hooks/deep-memo"
import { ConvertOptions } from "../../ProField/components/FieldStatus/utils"
import { isArray } from "@/utils/data/validate"

export interface ProFormCheckboxProps
	extends Omit<CheckboxGroupProps, "options"> {
	render?: BaseProFieldProps<ProFormCheckboxProps>["render"]
	options?: string[] | Array<{ label: string; value: any }>
	value?: CheckboxGroupProps["value"]
	request?: UseMemoFetchProps
}
function ProFormCheckbox(props: ProFormCheckboxProps) {
	const { request, options: PO, render, ...rest } = props
	const [{ data, loading }] = useMemoFetch({ cache: true, ...request })

	const options = useDeepMemo(() => {
		if (PO) return ConvertOptions(PO) // 直接设置的 options 优先级最高
		if (isArray(data)) return data as any
		return []
	}, [data, PO])

	const DOM = <Checkbox.Group {...rest} options={options} />
	if (render) return render({ ...rest, options }, DOM)
	return DOM
}
export default withFormItem<ProFormCheckboxProps>(ProFormCheckbox)