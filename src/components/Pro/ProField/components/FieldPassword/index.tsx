import React, { memo, ReactNode, useEffect, useState } from "react"
import { BaseProFieldProps } from "../../type"
import { renderHiddenMark } from "./utils"
import withDefaultProps from "@/hocs/withDefaultProps"

interface FieldPasswordProps extends BaseProFieldProps<FieldPasswordProps> {
	text: string
	visible?: boolean
	hiddenMark: ReactNode
}

function FieldPassword(props: FieldPasswordProps) {
	const { text, render, hiddenMark, visible, ...rest } = props

	const [showPwd, setShowPwd] = useState(() => !!visible)
	useEffect(() => {
		setShowPwd(!!visible)
	}, [visible])

	const DOM = renderHiddenMark(text, hiddenMark, showPwd, setShowPwd)

	if (render) return render({ text, ...rest, visible, hiddenMark }, DOM)
	return DOM
}

export default memo(
	withDefaultProps(FieldPassword, {
		text: "-",
		hiddenMark: "*",
		visible: false,
	})
)
