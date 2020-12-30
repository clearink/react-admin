import Select, { SelectProps } from "antd/lib/select"
import React from "react"
import { FC } from "react"
import withFormItem from "../../hocs/withFormItem"
import { FieldSelect } from "../../ProField"
import { FieldSelectProps } from "../../ProField/components/FieldSelect"
import { BaseProFieldProps } from "../../ProField/type"

export interface ProFormSelectProps<T = any> extends SelectProps<T> {
	render?: BaseProFieldProps<ProFormSelectProps>["render"]
}

function ProFormSelect<T = any>(props: ProFormSelectProps<T>) {
	const { render, ...rest } = props
	const DOM = <Select {...rest} />
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<FieldSelectProps>(ProFormSelect, { showTag: true })
