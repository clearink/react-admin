import React, { ComponentType } from "react"
import {
	DefaultElement,
	DefaultLeaf,
	RenderElementProps,
	RenderLeafProps,
} from "slate-react"
import EditorType from "../utils/EditorType"
import Bold from "./Bold"
import Code from "./Code"
import Italic from "./Italic"
import LetterSpacing from "./LetterSpacing"
import LineHeight from "./LineHeight"

export default [
	{
		key: EditorType.BOLD,
		component: Bold,
		leafStyle(props: RenderLeafProps) {
			const { attributes, children, leaf } = props
			const type = leaf.type as any
			return (
				<span {...attributes} style={{ fontWeight: type }}>
					{children}
				</span>
			)
		},
	},
	{
		key: EditorType.CODE,
		component: Code,
		// 特定渲染格式
		element(props: RenderElementProps) {
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
		leafStyle(props: RenderLeafProps) {
			const { children, leaf, attributes } = props
			const spacing = leaf.spacing as number
			return (
				<span {...attributes} style={{ letterSpacing: spacing }}>
					{children}
				</span>
			)
		},
	},
	{
		// 行高
		key: EditorType.LINE_HEIGHT,
		component: LineHeight,
		leafStyle(props: RenderLeafProps) {
			const { children, leaf, attributes } = props
			const height = leaf.height as number
			console.log("line-height", height)
			return (
				<span {...attributes} style={{ lineHeight: height }}>
					{children}
				</span>
			)
		},
	},
	{
		// 斜体
		key: "italic",
		component: Italic,
		leafStyle(props: RenderLeafProps) {
			const { children, leaf, attributes } = props
			const type = leaf.type as any
			console.log("italics", props)
			return (
				<span {...attributes} style={{ fontStyle: type }}>
					{children}
				</span>
			)
		},
	},
] as Array<{
	key: string
	component: ComponentType<any>
	element?: typeof DefaultElement
	leafStyle?: typeof DefaultLeaf
}>

/**
	 leafStyle 修改样式
	 element 修改标签
 * 
 */
