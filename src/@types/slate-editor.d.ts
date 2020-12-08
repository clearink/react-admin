import { RenderElementProps } from "slate-react"
export type TElement = (
	props: RenderElementProps | RenderLeafProps
) => JSX.Element
