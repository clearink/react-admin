import React from "react"
import { IBaseProps } from "@/@types/fc"
import { Button, Form, Input } from "antd"
const { useForm } = Form
function BasicForm(props: IBaseProps) {
	const [form] = useForm()

	console.log(form.getFieldValue("name"), "render")
	return (
		<div className='min-h-full'>
			<Form
				form={form}
				onFinish={(v) => console.log(v)}
				initialValues={{ name: "12312" }}
			>
				<Form.Item
					name='name'
					label='name'
					rules={[{ required: true, message: "required" }]}
				>
					<Input />
				</Form.Item>
				<Button type='primary' htmlType='submit'>
					submit
				</Button>
			</Form>
		</div>
	)
}

export default BasicForm
