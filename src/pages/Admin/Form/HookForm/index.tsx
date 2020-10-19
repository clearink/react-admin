import PageHeaderWrap from "@/components/PageHeaderWrap"
import React from "react"
import { Controller, get, useForm, useFormContext } from "react-hook-form"
import { Button, Form, Input } from "antd"
import { yupResolver } from "@hookform/resolvers/yup"
import ErrorMessage from "@/components/ErrorMessage"
import * as yup from "yup"

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
	const { handleSubmit, register, control, errors } = useForm({
		mode: "onChange", //表单值校验时机
		resolver,
	})
	console.log(get(errors, "firstName"))
	return (
		<div>
			<PageHeaderWrap title='React-Hook-Form test' className='bg-white' />
			<div>1231</div>
			<Form className='w-64 mx-auto'>
				<ErrorMessage errors={errors} name='firstName'>
					<Controller
						as={Input.Password}
						control={control}
						defaultValue=""
						name='firstName'
					/>
				</ErrorMessage>
				<Button
					type='primary'
					onClick={handleSubmit((values) => {
						console.log(values)
					})}
				>
					submit
				</Button>
			</Form>
		</div>
	)
}

export default HookForm
