import { Form } from "antd"
import { ButtonProps } from "antd/lib/button"
import { FormInstance } from "antd/lib/form"
import React, {
	forwardRef,
	memo,
	Ref,
	useImperativeHandle,
	useState,
} from "react"
import useMemoCallback from "../../hooks/memo-callback"
import useMountedRef from "../../hooks/mounted-ref"
import ProFormContext from "../../utils/ProFormContext"
import { BaseFormProps } from "../type"
import Submitter from "./Submitter"

function BaseForm(props: BaseFormProps, ref: Ref<FormInstance | undefined>) {
	const {
		children,
		form: propsForm,
		submitConfig, // 为 false 不渲染 submitter
		onFinish,
		loading: propsLoading,
		...rest
	} = props
	const [loading, setLoading] = useState<ButtonProps["loading"]>(propsLoading)
	const [form] = Form.useForm(propsForm) // 可以使用外部的form

	useImperativeHandle(ref, () => form, [form]) // 暴露 form
	const mountedRef = useMountedRef()
	// 包装的 finish
	const handleFinish = useMemoCallback(async (values: any) => {
		if (typeof onFinish !== "function") return
		try {
			setLoading({ delay: 50 }) // 太大会导致内存泄漏
			// TODO: 后续加上事先转换各种数据 比如Moment EditState
			await onFinish(values)
		} catch (error) {
		} finally {
			// 组件卸载后不设置属性
			if (mountedRef.current) setLoading(false)
		}
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
