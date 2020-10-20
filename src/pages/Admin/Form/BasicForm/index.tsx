import React from "react"
import { IBaseProps } from "@/@types/fc"
import { Button, Form, Input } from "antd"
const { useForm } = Form
function BasicForm(props: IBaseProps) {
	const [form] = useForm()

	console.log(form.getFieldValue("name"), "render")
	return (
		<div className='min-h-full'>
			BasicForm
			<Form onFinish={(v) => console.log(v)}>
				<Form.Item
					name='name'
					rules={[{ required: true, message: "required" }]}
				>
					<Input />
				</Form.Item>
				<Button name='123' type='primary'>
					submit
				</Button>
				<Button type='primary' htmlType='submit'>
					submit
				</Button>
			</Form>
		</div>
	)
}

export default BasicForm
