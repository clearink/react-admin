import { ComponentType } from "react"
import ReactGridLayout, { ReactGridLayoutProps } from "react-grid-layout"

export default ReactGridLayout as ComponentType<
	ReactGridLayoutProps & {
		innerRef?: any
	}
>
