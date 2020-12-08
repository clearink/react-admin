import { Editor, Text, Transforms } from "slate"
const CustomEditor = {
	isBoldMarkActive(editor: Editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.type === "bold",
			universal: true,
		})
		return !!match
	},

	isCodeBlockActive(editor: Editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.type === "code",
		})
		return !!match
	},

	isItalicsActive(editor: Editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.type === "italics",
		})
		return !!match
	},

	toggleBoldMark(editor: Editor) {
		const isActive = CustomEditor.isBoldMarkActive(editor)
		Transforms.setNodes(
			editor,
			{ type: isActive ? null : "bold" },
			{ match: (n) => Text.isText(n), split: true }
		)
	},

	toggleCodeBlock(editor: Editor) {
		const isActive = CustomEditor.isCodeBlockActive(editor)
		Transforms.setNodes(
			editor,
			{ type: isActive ? null : "code" },
			{ match: (n) => Editor.isBlock(editor, n) }
		)
	},

	toggleItalics(editor: Editor) {
		const isActive = CustomEditor.isItalicsActive(editor)
		Transforms.setNodes(
			editor,
			{ type: isActive ? null : "italic" },
			{ match: (n) => Text.isText(n), split: true }
		)
	},

	// 改变字间距
	changeLetterSpacing(editor: Editor, number: number) {
		Transforms.setNodes(
			editor,
			{ type: "letter-spacing", spacing: number },
			{ match: (n) => Text.isText(n), split: true }
		)
	},

	// 改变行高
	changeLineHeight(editor: Editor, number: number) {
		Transforms.setNodes(
			editor,
			{ type: "line-height", height: number },
			{ match: (n) => Text.isText(n), split: true }
		)
	},
}

export default CustomEditor
