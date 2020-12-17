import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { Space } from "antd"
import React, { createElement, ReactNode } from "react"
import "./style.scss"

export function renderHiddenMark(
	text: string,
	hiddenMark: ReactNode,
	showPwd: boolean,
	setShowPwd: React.Dispatch<React.SetStateAction<boolean>>
): JSX.Element {
	return (
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
}
