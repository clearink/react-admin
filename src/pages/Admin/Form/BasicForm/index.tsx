import React from "react"
import { IBaseProps } from "@/@types/fc"
import { Button, DatePicker, Form, Input } from "antd"
import PriceInput from "../HookForm/test"
const { useForm } = Form
function BasicForm(props: IBaseProps) {
	const [form] = useForm()

	console.log("render")
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
				<Form.Item
					name='price'
					label='price'
					rules={[
						{
							required: true,
							validator(_, value, cb) {
								console.log(value)
								if (!value) {
									cb("required")
								} else cb()
							},
						},
					]}
				>
					<PriceInput />
				</Form.Item>
				<Form.Item
					name='date'
					label='date'
					rules={[{ required: true, message: "required" }]}
				>
					<DatePicker />
				</Form.Item>
				<Button type='primary' htmlType='submit'>
					submit
				</Button>
			</Form>
		</div>
	)
}

export default BasicForm
