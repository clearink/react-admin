import React, { FC, forwardRef, ForwardRefExoticComponent } from "react"
import { IBaseProps } from "@/@types/fc"
import { Input, Form, Button } from "antd"
import { InputProps } from "antd/lib/input"

function Article(props: IBaseProps) {
	const [form] = Form.useForm()
	return (
		<div className='flex bg-white w-full min-h-full'>
			<Form form={form}>
				<Form.Item
					name='user'
					rules={[
						{
							required: true,
						},
					]}
					label='user'
				>
					<PPText placeholder='12312123' />
				</Form.Item>
				<Button htmlType='submit'>submit</Button>
			</Form>
		</div>
	)
}
const PPText: ForwardRefExoticComponent<InputProps> = forwardRef(
	(props, ref) => {
		console.log(props)
		return <Input {...props} />
	}
)
export default Article
