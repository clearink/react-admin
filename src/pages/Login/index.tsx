import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Form, Input, Button } from "antd"
import { Store } from "antd/lib/form/interface"
import { useHistory } from "react-router-dom"
import { actions } from "@/store/reducers/user"
import useTypedSelector from "@/hooks/useTypedSelector"
import useUnwrapAsyncThunk from "@/hooks/useUnwrapAsyncThunk"
import Logo from "@/assets/images/login_logo.png"
import { PepLifeIcon } from "@/components/IconFont"
import Footer from "@/components/Footer"
import "./style.scss"

const { useForm } = Form

const formValidateMessages = {
	// eslint-disable-next-line no-template-curly-in-string
	required: "请输入 ${name}",
}

function Login(props: IBaseProps) {
	const [form] = useForm()
	const { loginLoading } = useTypedSelector((state) => state.user)
	const { push } = useHistory()
	const unwrap = useUnwrapAsyncThunk()
	const handleSubmit = async (values: Store) => {
		await unwrap(actions.login(values))
		push("/")
	}

	return (
		<div className='app-login-layout'>
			{/* <ParticlesBg type='cobweb' bg /> */}
			<div className='login-page__wrap'>
				<div className='login-box__wrap select-none'>
					<div className='login-box__title'>
						<img src={Logo} alt='LOGO' className='logo' />
						<h1>智慧养老看护服务系统</h1>
					</div>
					<Form
						form={form}
						validateMessages={formValidateMessages}
						className='login-box__form w-5/6 sm:w-3/4'
						onFinish={handleSubmit}
					>
						<Form.Item name='username' rules={[{ required: true }]}>
							<Input
								className='login-box__username'
								placeholder='请输入用户名称'
								prefix={<PepLifeIcon type='icon-user' className='icon' />}
							/>
						</Form.Item>
						<Form.Item name='password' rules={[{ required: true }]}>
							<Input.Password
								className='login-box__password'
								placeholder='请输入登录密码'
								prefix={<PepLifeIcon type='icon-password' className='icon' />}
							/>
						</Form.Item>

						<Button
							loading={loginLoading}
							type='primary'
							htmlType='submit'
							className='login-box__submit'
							block
						>
							登录
						</Button>
					</Form>
				</div>
			</div>
			<Footer />
		</div>
	)
}
export default memo(Login)
