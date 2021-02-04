import { Form } from "antd"
import { ButtonProps } from "antd/lib/button"
import { FormInstance } from "antd/lib/form"
import React, { forwardRef, Ref, useImperativeHandle, useState } from "react"
import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import useMountedRef from "@/components/Pro/hooks/mounted-ref"
import ProFormContext from "./ProFormContext"
import Submitter from "../Submitter"
import { BaseFormProps } from "../../type"
import { formatFormValues } from "./utils"
import withDefaultProps from "@/hocs/withDefaultProps"

function BaseForm(props: BaseFormProps, ref: Ref<FormInstance | undefined>) {
	const {
		children,
		form: propsForm,
		submitConfig, // 为 false 不渲染 submitter
		onFinish,
		loading: propsLoading,
		timeFormat,
		...rest
	} = props
	const [loading, setLoading] = useState<ButtonProps["loading"]>(propsLoading)
	const [form] = Form.useForm(propsForm) // 可以使用外部的form

	useImperativeHandle(ref, () => form, [form]) // 暴露 form
	const mountedRef = useMountedRef()
	// 包装的 finish
	const handleFinish = useMemoCallback(
		async (values: any) => {
			if (typeof onFinish !== "function") return
			try {
				setLoading({ delay: 50 }) // 太大会导致内存泄漏
				// TODO: 后续加上事先转换各种数据 比如Moment EditState
				await onFinish(formatFormValues(values, timeFormat))
			} catch (error) {
			} finally {
				// 组件卸载后不设置属性
				if (mountedRef.current) setLoading(false)
			}
		},
		[timeFormat]
	)
	return (
		<ProFormContext.Provider value={{ form, loading }}>
			<Form form={form} {...rest} onFinish={handleFinish}>
				{children}
				{submitConfig === false ? null : <Submitter {...submitConfig} />}
				<button type='submit' hidden></button>
			</Form>
		</ProFormContext.Provider>
	)
}
BaseForm.List = Form.List
export default withDefaultProps(forwardRef(BaseForm), {
	timeFormat: "YYYY-MM-DD",
})
