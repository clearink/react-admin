import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Form, Input, Button, message } from "antd"
import { Store } from "antd/lib/form/interface"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { AppState } from "@/store"
import { useHistory } from "react-router-dom"
import { login } from "@/store/reducers/user"
import { unwrapResult } from "@reduxjs/toolkit"
const { useForm } = Form

const formValidateMessages = {
	// eslint-disable-next-line no-template-curly-in-string
	required: "请输入 ${name}",
}

function Login(props: IBaseProps) {
	const [form] = useForm()
	const { loading } = useSelector(
		(state: AppState) => ({ ...state.user }),
		shallowEqual
	)
	const { push } = useHistory()
	const dispatch = useDispatch()
	const handleSubmit = async (values: Store) => {
		const resAction = await dispatch(login(values))
		unwrapResult<any>(resAction)
	}

	return (
		<div className='login-page__wrap'>
			<div className='login-box__wrap select-none'>
				<h1 className='login-box__title'>欢迎登陆</h1>
				<Form
					form={form}
					validateMessages={formValidateMessages}
					className='login-box__form w-5/6 sm:w-3/4'
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
