import React, {
	forwardRef,
	memo,
	ReactNode,
	Ref,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Input } from "antd"
import { BaseProFieldProps } from "../../type"
import { PasswordProps } from "antd/lib/input"
import { renderHiddenMark } from "./utils"
import withProField from "@/components/Pro/hocs/withProField"

interface FieldPasswordProps extends BaseProFieldProps {
	formItemProps?: PasswordProps
	text: string
	visible?: boolean
	hiddenMark: ReactNode
}
const defaultFormItemProps = {
	placeholder: "请输入",
	allowClear: true,
}
function FieldPassword(props: FieldPasswordProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		hiddenMark,
		visible,
		formItemProps,
		...rest
	} = props

	const inputRef = useRef<any>()
	const [showPwd, setShowPwd] = useState(() => !!visible)
	useEffect(() => {
		setShowPwd(!!visible)
	}, [visible])

	useImperativeHandle(
		ref,
		() => ({ ...inputRef.current, showPwd, setShowPwd } ?? {}),
		[showPwd]
	)

	if (mode === "read") {
		const dom = renderHiddenMark(text, hiddenMark, showPwd, setShowPwd)
		if (render) return render(text, { mode, ...rest, visible, hiddenMark }, dom)
		return dom
	}
	const formItemDom = (
		<Input.Password {...defaultFormItemProps} {...rest} {...formItemProps} />
	)
	if (renderFormItem)
		return renderFormItem(text, { mode,...rest. ...formItemProps }, formItemDom)
	return formItemDom
}

export default withProField(FieldPassword, {
	text: "-",
	hiddenMark: "*",
	visible: false,
	formItemProps: defaultFormItemProps,
})
