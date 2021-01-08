import React, { ReactNode, useContext, useState } from "react"
import withFormItem from "@/components/Pro/hocs/withFormItem"
import classNames from "classnames"
import { Button, Input } from "antd"
import { ButtonProps } from "antd/lib/button"
import { FormInstance } from "antd/lib/form"
import CountDown from "./CountDown"
import { InputProps } from "antd/lib/input"
import ProFormContext from "../BaseForm/ProFormContext"

/* 验证码封装组件
ProFormCaptcha
*/
interface ProFormCaptchaProps extends InputProps {
	// 一般验证码是需要手机号或其它联系方式 用户才能获取到
	// 所以在 onGetCaptcha 函数中可以使用formInstance 去验证联系方式是否有效
	// 返回 true 开始倒计时
	onGetCaptcha?: (form?: FormInstance) => Promise<boolean>
	captchaProps?: Omit<ButtonProps, "children" | "disabled" | "loading"> & {
		text?: ReactNode // 平常显示的文本
		countDown?: number // 验证码 倒计时的时长 秒为单位
	}
}
function ProFormCaptcha(props: ProFormCaptchaProps) {
	const { onGetCaptcha, captchaProps, ...rest } = props
	const { text, countDown, ...captchaPropsRest } = captchaProps ?? {}

	const [loading, setLoading] = useState<ButtonProps["loading"]>(false)
	const { form } = useContext(ProFormContext)
	const handleClick = async (start: Function) => {
		if (typeof onGetCaptcha !== "function") return
		try {
			setLoading({ delay: 100 })
			const result = await onGetCaptcha(form)
			if (result) start()
		} finally {
			setLoading(false)
		}
	}
	return (
		<div className='flex items-center'>
			<Input {...rest} className={classNames("flex-auto", rest.className)} />
			{/* 获取验证码的 */}
			<CountDown num={countDown ?? 60}>
				{({ active, count, start }) => (
					<Button
						size={rest.size}
						loading={loading}
						disabled={active}
						onClick={() => handleClick(start)}
						{...captchaPropsRest}
						className={classNames("ml-4", captchaPropsRest.className)}
					>
						{active ? `${count}秒后重新获取` : captchaProps?.text ?? "获取验证码"}
					</Button>
				)}
			</CountDown>
		</div>
	)
}

export default withFormItem<ProFormCaptchaProps>(ProFormCaptcha)
