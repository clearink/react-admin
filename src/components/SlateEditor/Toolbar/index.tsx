import React, { ComponentType, CSSProperties } from "react"
import { DefaultElement, RenderLeafProps } from "slate-react"
import EditorType from "../utils/EditorType"
import Bold from "./Bold"
import Code from "./Code"
import Italic from "./Italic"
import LetterSpacing from "./LetterSpacing"
import LineHeight from "./LineHeight"
import TextCenter from "./TextCenter"
import TextDeleteLine from "./TextDeleteLine"
import TextUnderLine from "./TextUnderLine"

// component toolbar 组件
// leafStyle leaf style
export default [
	{
		key: EditorType.BOLD,
		component: Bold,
		leafStyle(props) {
			const { leaf } = props
			if (leaf[EditorType.BOLD]) return { fontWeight: EditorType.BOLD }
			return {}
		},
	},
	{
		key: EditorType.CODE,
		component: Code,
		// 特定渲染格式
		element(props) {
			const { attributes, children } = props
			return (
				<pre {...attributes}>
					<code>{children}</code>
				</pre>
			)
		},
	},
	{
		// 字间距
		key: EditorType.LETTER_SPACING,
		component: LetterSpacing,
		leafStyle(props) {
			const { leaf } = props
			if (leaf[EditorType.LETTER_SPACING])
				return { [EditorType.LETTER_SPACING]: 2 }
			return {}
		},
	},
	{
		// 行高
		key: EditorType.LINE_HEIGHT,
		component: LineHeight,
		leafStyle(props) {
			const { leaf } = props
			if (leaf[EditorType.LINE_HEIGHT]) return { [EditorType.LINE_HEIGHT]: 2 }
			return {}
		},
	},
	{
		// 斜体
		key: EditorType.ITALIC,
		component: Italic,
		leafStyle(props) {
			const { leaf } = props
			if (leaf[EditorType.ITALIC]) return { fontStyle: EditorType.ITALIC }
			return {}
		},
	},
	{
		// 下划线
		key: EditorType.UNDERLINE,
		component: TextUnderLine,
		leafStyle(props, style) {
			const { leaf } = props
			if (leaf[EditorType.UNDERLINE]) {
				if (style.textDecoration)
					return {
						textDecoration: `${style.textDecoration} ${EditorType.UNDERLINE}`,
					}
				return { textDecoration: EditorType.UNDERLINE }
			}
			return {}
		},
	},
	{
		// 删除线
		key: EditorType.DELETE_LINE,
		component: TextDeleteLine,
		leafStyle(props, style) {
			const { leaf } = props
			if (leaf[EditorType.DELETE_LINE]) {
				if (style.textDecoration)
					return {
						textDecoration: `${style.textDecoration} ${EditorType.DELETE_LINE}`,
					}
				return { textDecoration: EditorType.DELETE_LINE }
			}
			return {}
		},
	},
	{
		// 居中
		key: EditorType.TEXT_CENTER,
		component: TextCenter,
		element(props) {
			console.log("		key: EditorType.TEXT_CENTER,",props)
			return { textAlign: "center" }
		},
	},
] as Array<{
	key: string
	component: ComponentType<any>
	element?: typeof DefaultElement
	leafStyle?: (props: RenderLeafProps, style: CSSProperties) => CSSProperties
}>
