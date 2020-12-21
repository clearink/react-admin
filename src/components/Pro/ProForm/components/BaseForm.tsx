import useBoolean from "@/hooks/useBoolean"
import { Form } from "antd"
import React, { memo, useCallback } from "react"
import ProFormContext from "../../utils/ProFormContext"
import { BaseFormProps } from "../type"
import Submitter from "./Submitter"

function BaseForm(props: BaseFormProps) {
	const { children, form: propsForm, submitConfig, onFinish, ...rest } = props
	const [loading, toggle] = useBoolean() // submit loading 效果
	const [form] = Form.useForm(propsForm)

	// 包装的 finish
	const handleFinish = useCallback(
		async (values: any) => {
			if (typeof onFinish !== "function") return
			try {
				toggle()
				await onFinish(values)
			} finally {
				toggle()
			}
		},
		[onFinish, toggle]
	)
	return (
		<ProFormContext.Provider value={form}>
			<Form form={form} {...rest} onFinish={handleFinish}>
				{children}
				<Submitter
					form={form}
					{...submitConfig}
					submitProps={{ loading, ...submitConfig?.submitProps }}
				/>
			</Form>
		</ProFormContext.Provider>
	)
}

export default memo(BaseForm)
