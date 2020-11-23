import PageHeaderWrap from "@/components/PageHeaderWrap"
import React from "react"
import { Form, useForm } from "@/components/Form"
import { Button, Input, Switch } from "antd"

function HookForm() {
	const methods = useForm()
	console.log("render")
	return (
		<div>
			<PageHeaderWrap title='React-Hook-Form 封装测试' className='bg-white' />
			<Form
				form={methods}
				onSubmit={(v) => console.log(v)}
				className='w-3/4 mt-10 ml-20'
			>
				<Form.Item
					name='switch'
					label='switch'
					defaultValue={true}
					propName='checked'
				>
					<Switch />
				</Form.Item>
				{/* <Form.Item> */}
				<Button htmlType='submit'>submit</Button>
				{/* </Form.Item> */}
			</Form>
		</div>
	)
}

export default HookForm
