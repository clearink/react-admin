import { Editor, Text, Transforms } from "slate"
import EditorType from "./EditorType"

/**
 * type 是 用来区分 renderItem 的
 * 其他是用来设置leafStyle的
 */

const CustomEditor = {
	isBoldMarkActive(editor: Editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n[EditorType.BOLD] === true,
			universal: true,
		})
		return !!match
	},
	toggleBoldMark(editor: Editor) {
		const isActive = CustomEditor.isBoldMarkActive(editor)
		Transforms.setNodes(
			editor,
			{ [EditorType.BOLD]: !isActive },
			{ match: (n) => Text.isText(n), split: true }
		)
	},

	isCodeBlockActive(editor: Editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.type === EditorType.CODE,
		})
		return !!match
	},
	toggleCodeBlock(editor: Editor) {
		const isActive = CustomEditor.isCodeBlockActive(editor)
		Transforms.setNodes(
			editor,
			{ type: isActive ? null : EditorType.CODE },
			{ match: (n) => Editor.isBlock(editor, n) }
		)
	},

	isItalicsActive(editor: Editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n[EditorType.ITALIC] === true,
		})
		return !!match
	},
	toggleItalics(editor: Editor) {
		const isActive = CustomEditor.isItalicsActive(editor)
		Transforms.setNodes(
			editor,
			{ [EditorType.ITALIC]: !isActive },
			{ match: (n) => Text.isText(n), split: true }
		)
	},

	isUnderLineActive(editor: Editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n[EditorType.UNDERLINE] === true,
		})
		return !!match
	},
	// 下划线
	toggleUnderLine(editor: Editor) {
		const isActive = CustomEditor.isUnderLineActive(editor)
		Transforms.setNodes(
			editor,
			{ [EditorType.UNDERLINE]: !isActive },
			{ match: (n) => Text.isText(n), split: true }
		)
	},

	isDeleteLineActive(editor: Editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n[EditorType.DELETE_LINE] === true,
		})
		return !!match
	},
	// 下划线
	toggleDeleteLine(editor: Editor) {
		const isActive = CustomEditor.isDeleteLineActive(editor)
		Transforms.setNodes(
			editor,
			{ [EditorType.DELETE_LINE]: !isActive },
			{ match: (n) => Text.isText(n), split: true }
		)
	},

	// 居中
	isTextCenterActive(editor: Editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.type === EditorType.TEXT_CENTER,
		})
		return !!match
	},
	toggleTextCenter(editor: Editor) {
		const isActive = CustomEditor.isTextCenterActive(editor)
		Transforms.setNodes(
			editor,
			{ type: isActive ? null : EditorType.TEXT_CENTER },
			{ match: (n) => Editor.isBlock(editor, n) }
		)
	},

	// 改变字间距
	changeLetterSpacing(editor: Editor, number: number) {
		Transforms.setNodes(
			editor,
			{ [EditorType.LETTER_SPACING]: number },
			{ match: (n) => Text.isText(n), split: true }
		)
	},

	// 改变行高
	changeLineHeight(editor: Editor, number: number) {
		Transforms.setNodes(
			editor,
			{ [EditorType.LINE_HEIGHT]: number },
			{ match: (n) => Text.isText(n), split: true }
		)
	},
}

export default CustomEditor
