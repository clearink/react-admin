import useActionPending from "@/components/Pro/hooks/action-pending"
import { useToggle } from "@/components/Pro/hooks/boolean"
import useDeepEqual from "@/components/Pro/hooks/deep-equal"
import { ProTableColumns } from "@/components/Pro/ProTable/type"
import withDefaultProps from "@/hocs/withDefaultProps"
import { useFetchDataProps } from "@/hooks/useMemoFetch"
import http from "@/http"
import { isObject } from "@/utils/validate"
import { Form } from "antd"
import React, { forwardRef, memo, Ref, useEffect, useMemo } from "react"
import DrawerForm, { DrawerFormProps, DrawerFormRef } from "."
import { formItemMap } from "../.."
import ProFormGroup from "../ProFormGroup"
import ProFormInput from "../ProFormInput"

// 先将就用一下
export interface RenderDrawerFormProps extends DrawerFormProps {
	columns?: ProTableColumns<any>[]
	render?: (dom: JSX.Element[]) => JSX.Element
	request?: useFetchDataProps
}

// 编辑表单
function RenderDrawerForm(
	props: RenderDrawerFormProps,
	ref: Ref<DrawerFormRef | undefined>
) {
	const { columns, render, id, request, ...rest } = props
	const [form] = Form.useForm(rest.form)

	// edit url method
	const [count, editAction] = useActionPending(async () => {
		if (id === undefined) return
		const method = request?.method ?? "get"
		const url = request?.url
		const params = request?.params
		const { data } = await http[method as any](url, params)
		console.log(data)
	})
	// id变化重新请求 且要等到 drawer 完全打开才去请求数据
	// 要不然会卡一下
	const idEqual = useDeepEqual(id)
	useEffect(() => {
		if (!idEqual) editAction()
		// 请求数据
	}, [editAction, idEqual])

	const children = useMemo(() => {
		if (!columns) return [<></>]
		return columns
			.filter((item) => !item.hideInForm && item.edit)
			.map((item, index) => {
				const { field, fieldProps, edit, title, dataIndex } = item
				const FormItem = formItemMap[field ?? "text"] ?? ProFormInput
				const editProps = fieldProps ?? {}
				if (isObject(edit)) Object.assign(editProps, edit)
				return (
					<FormItem key={index} label={title} name={dataIndex} {...editProps} />
				)
			})
	}, [columns])

	return (
		<DrawerForm ref={ref} form={form} {...rest} loading={count > 0}>
			<ProFormGroup>{render?.(children) ?? children}</ProFormGroup>
		</DrawerForm>
	)
}

export default memo(
	withDefaultProps(forwardRef(RenderDrawerForm), { trigger: null })
)
