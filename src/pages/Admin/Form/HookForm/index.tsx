import PageHeaderWrap from "@/components/PageHeaderWrap"
import React from "react"
import { Form, useForm } from "@/components/Form"
import { Button, DatePicker, Input } from "antd"
import moment, { Moment } from "moment"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import PriceInput from "./test"
interface IFormInputs {
	firstName: string
	name: string
	money: { number: number; currency: "rmb" | "dollar" }
	date: Moment
}
const resolver = yup.object().shape({
	firstName: yup.string().required("required"),
	name: yup.string().min(4, "too short").max(7, "too long").required(),
})

function HookForm() {
	const methods = useForm<IFormInputs>({
		resolver: yupResolver(resolver),
		defaultValues: {
			firstName: "123",
			name: "12333",
			money: { number: 2, currency: "dollar" },
			date: moment(),
		},
	})
	return (
		<div>
			<PageHeaderWrap title='React-Hook-Form test' className='bg-white' />
			<div>1231</div>
			<Form
				form={methods}
				onSubmit={(v) => console.log(v)}
				className='w-3/4 mt-10 ml-20'
			>
				<Form.Item name='firstName' label='firstName' required>
					<Input.Password />
				</Form.Item>
				<Form.Item name='name' label='name' required>
					<Input />
				</Form.Item>
				<Form.Item name='test' label='测试' required refName='ref'>
					<input />
				</Form.Item>
				<Form.Item
					name='test render'
					label='测试 render'
					required
					render={() => {
						return <input />
					}}
				></Form.Item>
				<Form.Item name='money' label='money' required>
					<PriceInput />
				</Form.Item>
				<Form.Item name='date' label='date'>
					<DatePicker />
				</Form.Item>
				<Form.Item>
					<Button htmlType='submit'>submit</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default HookForm
