import { TElement } from "@/@types/slate-editor"
import React, {
	isValidElement,
	memo,
	useCallback,
	useMemo,
	useState,
} from "react"
import { createEditor, Node } from "slate"
import {
	Editable,
	Slate,
	withReact,
	RenderElementProps,
	RenderLeafProps,
} from "slate-react"
import styles from "./style.module.scss"
import Toolbar from "./Toolbar"
import DefaultElement from "./utils/DefaultElement"

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
	const [toolbarComponent, elementMap, leafList] = useMemo(() => {
		const toolbarComponent = []
		const elementMap: { [key: string]: TElement } = {}
		const leafList = []
		for (let i = 0; i < Toolbar.length; i++) {
			const { key, component, element, leafStyle } = Toolbar[i]
			if (!!element) elementMap[key] = element
			if (!!leafStyle) leafList.push(leafStyle)
			if (!!component) toolbarComponent.push({ component, key })
		}
		return [toolbarComponent, elementMap, leafList]
	}, [])

	const renderElement = useCallback(
		(props: RenderElementProps) => {
			const { element } = props
			const type: undefined | string = element.type as string
			const component = elementMap[type]
			let style = {}
			if (type && component) {
				const result = component(props)
				if (isValidElement(result)) return result
				else style = result
			}
			return <DefaultElement {...props} style={style} />
		},
		[elementMap]
	)

	// 遍历所有的leafStyle 拿到 leaf的全部样式
	const renderLeaf = useCallback(
		(props: RenderLeafProps) => {
			const style = leafList.reduce((pre, cur) => {
				return { ...pre, ...cur(props, pre) }
			}, {})
			return (
				<span {...props.attributes} style={style}>
					{props.children}
				</span>
			)
		},
		[leafList]
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
