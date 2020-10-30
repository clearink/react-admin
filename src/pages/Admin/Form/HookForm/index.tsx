import PageHeaderWrap from "@/components/PageHeaderWrap"
import React from "react"
import { Form, useForm } from "@/components/Form"
import { Button, DatePicker, Input } from "antd"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import PriceInput from "./test"
import { SubmitHandler } from "react-hook-form"

interface IFormInputs {
	firstName: string
	name: string
	money: { number: number; currency: "rmb" | "dollar" }
}

const resolver = yupResolver<IFormInputs>(
	yup.object().shape({
		firstName: yup.string().required("required"),
		name: yup
			.string()
			.min(4, "too short")
			.max(7, "too long")
			.required("required"),
	})
)
console.log(
	yup.object().shape({
		firstName: yup.string().required("required"),
		name: yup
			.string()
			.min(4, "too short")
			.max(7, "too long")
			.required("required"),
	})
)
function HookForm() {
	const methods = useForm({
		resolver,
		defaultValues: {
			firstName: "123",
			name: "12333",
			money: { number: 2, currency: "dollar" },
		},
	})
	console.log("render")
	return (
		<div>
			<PageHeaderWrap title='React-Hook-Form test' className='bg-white' />
			<div>1231</div>
			<Form form={methods} onSubmit={(v) => console.log(v.firstName)}>
				<Form.Item name='firstName' label='firstName'>
					<Input.Password />
				</Form.Item>
				<Form.Item name='name' label='name'>
					<Input />
				</Form.Item>
				<Form.Item name='money' label='money'>
					<PriceInput />
				</Form.Item>
				<Form.Item name='date' label='date'>
					<DatePicker />
				</Form.Item>
				<Button htmlType='submit'>submit</Button>
			</Form>
		</div>
	)
}

export default HookForm
