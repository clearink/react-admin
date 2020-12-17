import React, {
	forwardRef,
	memo,
	ReactNode,
	Ref,
	useImperativeHandle,
	useRef,
	useState,
} from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Input } from "antd"
import { BaseProFieldProps } from "../../type"
import { PasswordProps } from "antd/lib/input"
import { renderHiddenMark } from "./utils"

interface FieldPasswordProps extends BaseProFieldProps, PasswordProps {
	text: string
	textVisible: boolean
	hiddenMark: ReactNode
}
function FieldPassword(props: FieldPasswordProps, ref: Ref<any>) {
	const {
		text,
		mode,
		render,
		renderFormItem,
		textVisible,
		hiddenMark,
		...rest
	} = props

	const inputRef = useRef<any>()
	const [showPwd, setShowPwd] = useState(() => textVisible)

	useImperativeHandle(
		ref,
		() => ({ ...inputRef.current, showPwd, setShowPwd } ?? {}),
		[showPwd]
	)

	if (mode === "read") {
		const dom = renderHiddenMark(text, hiddenMark, showPwd, setShowPwd)
		if (render)
			return render(text, { mode, ...rest, textVisible, hiddenMark }, dom)
		return dom
	}
	const formDOM = <Input.Password ref={inputRef} {...rest} />
	if (renderFormItem) return renderFormItem(text, { mode, ...rest }, formDOM)
	return formDOM
}

export default memo(
	withDefaultProps(forwardRef(FieldPassword), {
		text: "-",
		hiddenMark: "*",
		placeholder: "请输入",
		textVisible: false,
		allowClear: true,
	})
)
