import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Store } from "antd/lib/form/interface"
import { useHistory } from "react-router-dom"
import { actions } from "@/store/reducers/user"
import useUnwrapAsyncThunk from "@/hooks/useUnwrapAsyncThunk"
import Logo from "@/assets/images/login_logo.png"
import IconFont from "@/components/IconFont"
import Footer from "@/components/Footer"
import "./style.scss"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import { ProFormCaptcha, ProFormInput } from "@/components/Pro/ProForm"
import { phonePattern } from "@/utils/form/pattern"
import user from "@/http/api/user"

const formValidateMessages = {
	// eslint-disable-next-line no-template-curly-in-string
	required: "请输入 ${name}",
}

function Login(props: IBaseProps) {
	const { push } = useHistory()
	const unwrap = useUnwrapAsyncThunk()

	const handleSubmit = async (values: Store) => {
		await unwrap(actions.login(values))[0]
		push("/")
	}

	return (
		<div className='app-login-layout'>
			{/* <ParticlesBg type='cobweb' bg /> */}
			<div className='login-page__wrap'>
				<div className='login-box__wrap select-none'>
					<div className='login-box__title'>
						<img src={Logo} alt='LOGO' className='logo' />
						<h1 className='app_title'>智慧养老看护服务系统</h1>
					</div>
					<BaseForm
						validateMessages={formValidateMessages}
						className='login-box__form'
						onFinish={handleSubmit}
						submitConfig={{
							submitProps: {
								block: true,
								size: "large",
								text: "登录",
							},
							render: (dom) => {
								return dom.pop()
							},
						}}
					>
						<ProFormInput
							name='mobile'
							rules={[
								{
									required: true,
									pattern: phonePattern,
									message: "手机号格式不正确",
								},
							]}
							placeholder='请输入手机号'
							prefix={<IconFont type='icon-user' className='icon' />}
							className='login-box__username'
						/>

						<ProFormCaptcha
							name='captcha'
							phoneName='mobile'
							className='login-box__password'
							captchaProps={{
								className: "login-box__password",
								style: { minWidth: 140 },
							}}
							rules={[{ required: true, message: "请输入验证码" }]}
							placeholder='请输入验证码'
							prefix={<IconFont type='icon-password' className='icon' />}
							onGetCaptcha={async (mobile) => {
								await user.GetCaptcha({ mobile })
								return true
							}}
						/>
					</BaseForm>
				</div>
			</div>
			<Footer />
		</div>
	)
}
export default memo(Login)
