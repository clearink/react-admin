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
import ProFormContext from "../../utils/ProFormContext"
import { BaseFormProps } from "../type"
import Submitter from "./Submitter"

// 维护一个loading
// 可以从外部控制
function BaseForm(props: BaseFormProps, ref: Ref<FormInstance | undefined>) {
	const {
		children,
		form: propsForm,
		submitConfig,
		onFinish,
		loading: propsLoading,
		...rest
	} = props

	const [loading, setLoading] = useState<ButtonProps["loading"]>(false) // submit loading 效果
	useEffect(() => {
		setLoading(propsLoading)
	}, [propsLoading])

	const [form] = Form.useForm(propsForm)

	useImperativeHandle(ref, () => form, [form])

	// 包装的 finish
	const handleFinish = useEventCallback(async (values: any) => {
		if (typeof onFinish !== "function") return
		try {
			setLoading({ delay: 50 })
			await onFinish(values)
		} finally {
			setLoading(false)
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
