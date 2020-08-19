import { ReactNode } from "react"
import { RouteChildrenProps } from "react-router-dom"
import { IWithRoutes } from "./route"

interface IBaseProps extends IWithRoutes, RouteChildrenProps {
	children?: ReactNode
	routes?: IRoute[]
}
