import React, { memo, useEffect, useMemo, useState } from "react"
import { createEditor, Node } from "slate"
import {
	Editable,
	Slate,
	useFocused,
	withReact,
	ReactEditor,
	useSelected
} from "slate-react"
import styles from "./style.module.scss"

// 基于slate封装的富文本组件
// 待完成
function SlateEditor() {
	const editor = useMemo(() => withReact(createEditor()), [])
	const focused = useFocused()
	console.log(useSelected());
	const [value, setValue] = useState<Node[]>([
		{
			type: "paragraph",
			children: [{ text: "slate.js 富文本" }],
		},
	])

	const handleFocus = () => {
		// 检查是否 聚焦
		if (!focused) {
			ReactEditor.focus(editor) // 聚焦
			// editor.selection({anchor: 1;
				// focus: 1;})
		}
	}
	return (
		<Slate
			editor={editor}
			value={value}
			onChange={(value) => {
				console.log(value)
				setValue(value)
			}}
		>
			<div className={styles.container} onClick={handleFocus}>
				<Editable
					onKeyDown={(e) => {
						if (e.key === "&") {
							e.preventDefault()
							editor.insertText(" and ")
						}
					}}
				/>
			</div>
		</Slate>
	)
}

export default memo(SlateEditor)
