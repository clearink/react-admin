import React, { memo, useEffect, useMemo, useState } from "react"
import { createEditor, Node } from "slate"
import {
	Editable,
	Slate,
	useFocused,
	withReact,
	ReactEditor,
	useSelected,
} from "slate-react"
import styles from "./style.module.scss"

// 基于slate封装的富文本组件
// 待完成
function SlateEditor() {
	const editor = useMemo(() => withReact(createEditor()), [])
	const focused = useFocused()
	const [value, setValue] = useState<Node[]>([
		{
			type: "paragraph",
			children: [{ text: "slate.js 富文本" }],
		},
	])

	return (
		<Slate editor={editor} value={value} onChange={setValue}>
			<div className={styles.container}>
				<div className={styles.toolbar}>toolbar</div>
				<Editable className={styles.editor} autoFocus />
			</div>
		</Slate>
	)
}

export default memo(SlateEditor)
