import PageHeaderWrap from "@/components/PageHeaderWrap"
import React from "react"
import { Form, useForm } from "@/components/Form"
import { Button, Input } from "antd"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Controller } from "react-hook-form"

const resolver = yupResolver(
	yup.object({
		firstName: yup
			.string()
			.min(2, "to short")
			.max(10, "too long")
			.required("required"),
	})
)

function HookForm() {
	const methods = useForm({ resolver })

	return (
		<div>
			<PageHeaderWrap title='React-Hook-Form test' className='bg-white' />
			<div>1231</div>
			<Form
				form={methods}
				className='w-64 mx-auto'
				onSubmit={(v) => console.log(v)}
			>
				<Form.Item name='firstName'>
					<Input.Password />
				</Form.Item>
				<Form.Item name='name'>
					<Input />
				</Form.Item>
				<Form.Item name='lastName'>
					<Input />
				</Form.Item>
				<Form.Item name='password'>
					<Input />
				</Form.Item>
				<Form.Item>
					<Input />
				</Form.Item>
				{/* <Form.Item> */}
				{/* </Form.Item> */}
				<Controller as={Input} control={methods.control} name='adas' />
				<Button htmlType='submit'>submit</Button>
				{/* <ErrorMessage errors={errors} name='firstName'>
					<Controller
						as={Input.Password}
						control={control}
						defaultValue=''
						name='firstName'
					/> 
				</ErrorMessage>*/}
			</Form>
		</div>
	)
}

export default HookForm
