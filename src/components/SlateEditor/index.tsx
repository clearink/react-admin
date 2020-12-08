import { Button } from "antd"
import React, { memo, useCallback, useEffect, useMemo, useState } from "react"
import { createEditor, Editor, Node, Transforms } from "slate"
import { Editable, Slate, withReact, DefaultElement } from "slate-react"
import styles from "./style.module.scss"
const CodeElement = (props: any) => {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	)
}
const Leaf = (props: any) => {
	return (
		<span
			{...props.attributes}
			style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
		>
			{props.children}
		</span>
	)
}
// 基于slate封装的富文本组件
// 待完成
function SlateEditor() {
	const editor = useMemo(() => withReact(createEditor()), [])
	const [value, setValue] = useState<Node[]>([
		{
			type: "paragraph",
			children: [{ text: "slate.js 富文本" }],
		},
	])
	const renderElement = useCallback((props) => {
		const { element } = props
		switch (element.type) {
			case "code":
				return <CodeElement {...props} />
			default:
				return <DefaultElement {...props} />
		}
	}, [])
	const renderLeaf = useCallback((props: any) => {
		return <Leaf {...props} />
	}, [])
	return (
		<Slate editor={editor} value={value} onChange={setValue}>
			<div className={styles.container}>
				<div className={styles.toolbar}>toolbar</div>
				<Button
					onClick={() => {
						// 如何将文本变粗
						// 1. 获取用户选择的数据
						const [match] = Editor.nodes(editor, {
							match: (n) => n.type === "code",
						})
						Transforms.setNodes(
							editor,
							{
								type: match ? "paragraph" : "code",
							},
							{ match: (n) => Editor.isBlock(editor, n) }
						)
						//
					}}
				>
					fontWeight
				</Button>
				<Editable
					className={styles.editor}
					autoFocus
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					onKeyDown={(event) => {
						if (event.ctrlKey) {
							event.preventDefault()
							// Determine whether any of the currently selected blocks are code blocks.
							const [match] = Editor.nodes(editor, {
								match: (n) => n.type === "code",
							})
							console.log(match)
							// Toggle the block type depending on whether there's already a match.
							Transforms.setNodes(
								editor,
								{ type: match ? "paragraph" : "code" },
								{ match: (n) => Editor.isBlock(editor, n) }
							)
						}
					}}
				/>
			</div>
		</Slate>
	)
}

export default memo(SlateEditor)
