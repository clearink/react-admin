import useBoolean from "@/hooks/useBoolean"
import { sleep } from "@/utils/test"
import { Form } from "antd"
import Button, { ButtonProps } from "antd/lib/button"
import { FormInstance } from "antd/lib/form"
import React, {
	forwardRef,
	memo,
	Ref,
	useCallback,
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
		setLoading(!!propsLoading)
	}, [propsLoading])

	const [form] = Form.useForm(propsForm)

	useImperativeHandle(ref, () => form, [form])

	// 包装的 finish
	const handleFinish = useCallback(
		async (values: any) => {
			if (typeof onFinish !== "function") return
			try {
				setLoading({ delay: 100 })
				await onFinish(values)
			} finally {
				setLoading(false)
			}
		},
		[onFinish]
	)
	return (
		<ProFormContext.Provider value={form}>
			<Form form={form} {...rest} onFinish={handleFinish}>
				{children}
				<Submitter
					{...submitConfig}
					submitProps={{ loading, ...submitConfig?.submitProps }}
				/>
				<button type='submit' hidden></button>
			</Form>
		</ProFormContext.Provider>
	)
}

export default memo(forwardRef(BaseForm))
