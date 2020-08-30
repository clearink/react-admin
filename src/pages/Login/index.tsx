import React, { memo, useEffect } from "react"
import { IBaseProps } from "@/@types/fc"
import { Form, Input, Button, message } from "antd"
import { Store } from "antd/lib/form/interface"
import { useSelector } from "react-redux"
import actions from "@/stores/actions"
import { StoreState } from "@/stores"
import { useHistory } from "react-router-dom"
const { useForm } = Form

function Login(props: IBaseProps) {
	const { loading } = useSelector((state: StoreState) => state.loading)
	const { login } = useSelector((state: StoreState) => state.user)
	const [form] = useForm()

	const { push, replace } = useHistory()

	const handleSubmit = async (values: Store) => {
		try {
			await actions.LoginAction(values)
			message.success("登录成功", 2)
			push("/")
		} catch (error) {}
	}

	// 判断是否登录
	useEffect(() => {
		if (!login) return
		const timer = setTimeout(() => {
			message.info("您已经登录了,将为您导航至主页", 1.5, () => replace("/"))
		}, 600)
		return () => {
			clearTimeout(timer)
		}
	}, [login, replace])

	return (
		<div className='login-page__wrap'>
			<div className='login-box__wrap select-none'>
				<h1 className='login-box__title'>欢迎登陆</h1>
				<Form
					form={form}
					validateMessages={formValidateMessages}
					className='login-box__form w-3/4'
					onFinish={handleSubmit}
				>
					<Form.Item name='username' rules={[{ required: true }]}>
						<Input className='login-box__username' placeholder='username' />
					</Form.Item>
					<Form.Item name='password' rules={[{ required: true }]}>
						<Input.Password
							className='login-box__password'
							placeholder='password'
						/>
					</Form.Item>
					<Form.Item>
						<Button
							loading={loading}
							type='primary'
							htmlType='submit'
							className='h-16'
							block
						>
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
