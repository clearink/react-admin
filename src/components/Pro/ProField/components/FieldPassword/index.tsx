import React, {
	createElement,
	forwardRef,
	memo,
	ReactNode,
	Ref,
	useImperativeHandle,
	useRef,
	useState,
} from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Input, Space } from "antd"
import { ProFieldProps } from "../type"
import "./style.scss"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"

interface IProps extends ProFieldProps {
	visible: boolean
	text: string
	hiddenMark: ReactNode // 密码隐藏占位符
}
function FieldPassword(props: IProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		fieldProps,
		hiddenMark,
		visible,
		...rest
	} = props

	const inputRef = useRef<any>()
	useImperativeHandle(ref, () => inputRef.current ?? {}, [])

	const [showPwd, setShowPwd] = useState(() => visible)

	if (mode === "read") {
		const dom = (
			<Space size={showPwd ? 1 : 3}>
				{Array.from({ length: text.length ?? 0 }, (_, i) => (
					<span className='field_password__mark' key={i}>
						{showPwd ? text[i] : hiddenMark}
					</span>
				))}
				<span onClick={() => setShowPwd((p) => !p)}>
					{createElement(showPwd ? EyeOutlined : EyeInvisibleOutlined, {
						className: "field_password__icon",
					})}
				</span>
			</Space>
		)
		if (render) return render(text, { mode, ...rest, ...fieldProps }, dom)
		return dom
	}
	const formDOM = (
		<Input.Password
			placeholder='请输入'
			ref={inputRef}
			allowClear
			{...rest}
			{...rest}
		/>
	)
	if (renderFormItem)
		return renderFormItem(text, { mode, ...rest, ...fieldProps }, formDOM)
	return formDOM
}

export default memo(
	withDefaultProps(forwardRef(FieldPassword), {
		text: "-",
		hiddenMark: "*",
		visible: false,
	})
)
