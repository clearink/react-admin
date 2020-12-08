import { Editor, Transforms, Element } from "slate"
export const MyEditor = {
	...Editor,
	insertImage(editor: Editor, url: string) {
		const element = { type: "image", url, children: [{ text: "" }] }
		Transforms.insertNodes(editor, element)
	},
}

export const MyElement = {
	...Element,
	isImageElement(value) {
		return Element.isElement(value) && value.type === "image"
	},
}
