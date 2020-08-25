import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Form, Input, Button } from "antd"
import { Store } from "antd/lib/form/interface"
const { useForm } = Form

function Login(props: IBaseProps) {
	const [form] = useForm()
	const handleSubmit = (values: Store) => {
		console.log(values, '发送请求')
		
	}
	return (
		<div className='login-page__wrap'>
			<div className='login-box__wrap'>
				<h1 className='login-box__title'>欢迎登陆</h1>
				<Form
					form={form}
					validateMessages={formValidateMessages}
					className='login-box__form w-3/4'
					onFinish={handleSubmit}
				>
					<Form.Item name='username' rules={[{ required: true }]}>
						<Input placeholder='username' />
					</Form.Item>
					<Form.Item name='password' rules={[{ required: true }]}>
						<Input.Password placeholder='password' />
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit' className='w-full h-16'>
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
export default memo(Login)

const formValidateMessages = {
	required: "请输入 ${name} ",
}
