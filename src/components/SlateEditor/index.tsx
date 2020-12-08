import { TElement } from "@/@types/slate-editor"
import React, { memo, useCallback, useMemo, useState } from "react"
import { createEditor, Node } from "slate"
import {
	Editable,
	Slate,
	withReact,
	DefaultElement,
	DefaultLeaf,
	RenderElementProps,
	RenderLeafProps,
} from "slate-react"
import styles from "./style.module.scss"
import Toolbar from "./Toolbar"

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

	// 工具栏组件
	const [toolbarComponent, elementMap, leafMap] = useMemo(() => {
		const toolbarComponent = []
		const elementMap: { [key: string]: TElement } = {}
		const leafMap = []
		for (let i = 0; i < Toolbar.length; i++) {
			const { key, component, element, leafStyle } = Toolbar[i]
			if (!!element) elementMap[key] = element
			if (!!leafStyle) leafMap.push(leafStyle)
			if (!!component) toolbarComponent.push({ component, key })
		}
		return [toolbarComponent, elementMap, leafMap]
	}, [])

	const renderElement = useCallback(
		(props: RenderElementProps) => {
			const { element } = props
			const type: undefined | string = element.type as string
			const ElementComponent = elementMap[type]
			if (type && ElementComponent) {
				return <ElementComponent {...props} />
			}
			return <DefaultElement {...props} />
		},
		[elementMap]
	)
	const renderLeaf = useCallback(
		(props: RenderLeafProps) => {
			const { leaf } = props
			const type: string | undefined = leaf.type as string
			const LeafComponent = leafMap[type]
			console.log("renderLeaf", props)
			if (type && LeafComponent) {
				return <LeafComponent {...props} />
			}
			return <DefaultLeaf {...props} />
		},
		[leafMap]
	)
	return (
		<Slate editor={editor} value={value} onChange={setValue}>
			<div className={styles.container}>
				<div className={styles.toolbar}>
					{toolbarComponent.map((item) => (
						<item.component key={item.key} />
					))}
				</div>
				<Editable
					className={styles.editor}
					autoFocus
					renderElement={renderElement}
					renderLeaf={renderLeaf}
				/>
			</div>
		</Slate>
	)
}

export default memo(SlateEditor)
