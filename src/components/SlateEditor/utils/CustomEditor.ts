import { Editor, Text, Transforms } from "slate"
import EditorType from "./EditorType"

/**
 * type 是 用来区分 renderItem 的
 * 其他是用来设置leafStyle的
 */

const CustomEditor = {
	isTextFormatActive(editor: Editor, format: any) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n[format] === true,
			mode: "all",
		})
		return !!match
	},
	toggleTextFormat(editor: Editor, format: any) {
		const isActive = CustomEditor.isTextFormatActive(editor, format)
		Transforms.setNodes(
			editor,
			{ [format]: isActive ? null : true },
			{ match: Text.isText, split: true }
		)
	},

	isBlockFormatActive(editor: Editor, format: any) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.type === format,
			mode: "all",
		})
		return !!match
	},
	toggleBlockFormat(editor: Editor, format: any) {
		const isActive = CustomEditor.isBlockFormatActive(editor, format)
		Transforms.setNodes(
			editor,
			{ type: isActive ? null : format },
			{ match: (n) => Editor.isBlock(editor, n) }
		)
	},

	toggleBoldMark(editor: Editor) {
		CustomEditor.toggleTextFormat(editor, EditorType.BOLD)
	},

	toggleCodeBlock(editor: Editor) {
		CustomEditor.toggleBlockFormat(editor, EditorType.CODE)
	},
	toggleItalics(editor: Editor) {
		CustomEditor.toggleTextFormat(editor, EditorType.ITALIC)
	},

	// 下划线
	toggleUnderLine(editor: Editor) {
		CustomEditor.toggleTextFormat(editor, EditorType.UNDERLINE)
	},

	// 下划线
	toggleDeleteLine(editor: Editor) {
		CustomEditor.toggleTextFormat(editor, EditorType.DELETE_LINE)
	},

	// 居中
	toggleTextCenter(editor: Editor) {
		CustomEditor.toggleBlockFormat(editor, EditorType.TEXT_CENTER)
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
