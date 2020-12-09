import React from "react"
import { RenderElementProps } from "slate-react"

interface IProps extends RenderElementProps {
	style?: React.CSSProperties
}
export default function DefaultElement(props: IProps) {
	const { attributes, children, style } = props
	return (
		<p {...attributes} style={style}>
			{children}
		</p>
	)
}
