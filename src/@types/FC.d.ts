import { IRoute } from "@/@types/route"
import { ReactNode } from "react"
import { RouteChildrenProps } from "react-router-dom"
interface IBaseProps extends RouteChildrenProps {
	routes?: IRoute[]
	children: ReactNode
}
