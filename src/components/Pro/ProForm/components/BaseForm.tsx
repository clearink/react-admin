import useEventCallback from "@/hooks/useEventCallback"
import { Form } from "antd"
import { ButtonProps } from "antd/lib/button"
import { FormInstance } from "antd/lib/form"
import React, {
	forwardRef,
	memo,
	Ref,
	useEffect,
	useImperativeHandle,
	useState,
} from "react"
import useMemoCallback from "../../hooks/memo-callback"
import ProFormContext from "../../utils/ProFormContext"
import { BaseFormProps } from "../type"
import Submitter from "./Submitter"

function BaseForm(props: BaseFormProps, ref: Ref<FormInstance | undefined>) {
	const {
		children,
		form: propsForm,
		submitConfig, // 为 false 不渲染 submitter
		onFinish,
		loading,
		...rest
	} = props

	const [form] = Form.useForm(propsForm) // 可以使用外部的form

	useImperativeHandle(ref, () => form, [form]) // 暴露 form

	// 包装的 finish
	const handleFinish = useMemoCallback((values: any) => {
		if (typeof onFinish !== "function") return
		onFinish(values)
	}, [])
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

export default memo(forwardRef(BaseForm))
