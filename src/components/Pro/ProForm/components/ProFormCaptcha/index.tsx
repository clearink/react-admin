import React, { ReactNode, useContext, useState } from "react"
import withFormItem from "@/components/Pro/hocs/withFormItem"
import classNames from "classnames"
import { Button, Input } from "antd"
import { ButtonProps } from "antd/lib/button"
import CountDown from "./CountDown"
import { InputProps } from "antd/lib/input"
import ProFormContext from "../BaseForm/ProFormContext"
import { NamePath } from "antd/lib/form/interface"

/* 验证码封装组件
ProFormCaptcha
*/
interface ProFormCaptchaProps extends InputProps {
	
	/** phone 的 name */
	phoneName: NamePath
	onGetCaptcha?: (phoneValue: string) => Promise<boolean>
	captchaProps?: Omit<ButtonProps, "children" | "disabled" | "loading"> & {
		text?: ReactNode // 平常显示的文本
		countDown?: number // 验证码 倒计时的时长 秒为单位
	}
}
function ProFormCaptcha(props: ProFormCaptchaProps) {
	const { onGetCaptcha, captchaProps, phoneName, ...rest } = props
	const { text, countDown, ...captchaPropsRest } = captchaProps ?? {}

	const [loading, setLoading] = useState<ButtonProps["loading"]>(false)
	const { form } = useContext(ProFormContext)
	const handleClick = async (start: Function) => {
		if (typeof onGetCaptcha !== "function") return
		try {
			setLoading({ delay: 100 })
			// 检测是否输入了手机号
			await form?.validateFields([phoneName])
			const phoneValue = form!.getFieldValue(phoneName)
			const result = await onGetCaptcha(phoneValue)
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
						{active ? `${count}秒后重发` : captchaProps?.text ?? "获取验证码"}
					</Button>
				)}
			</CountDown>
		</div>
	)
}

export default withFormItem<ProFormCaptchaProps>(ProFormCaptcha)
