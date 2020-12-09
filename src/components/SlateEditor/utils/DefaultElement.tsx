import { createElement } from "react"
import { RenderElementProps, useSlate } from "slate-react"

interface IProps extends RenderElementProps {
	style?: React.CSSProperties
}
export default function DefaultElement(props: IProps) {
	const { attributes, children, style, element } = props
	const editor = useSlate()
	return createElement(
		editor.isInline(element) ? "span" : "div",
		{
			...attributes,
			style,
		},
		children
	)
}
