import { IRoute } from "@/@types/route"
import { PropsWithChildren } from "react"
import { RouteChildrenProps } from "react-router-dom"
import { IWithRoutes } from "./route"

interface IBaseProps
	extends IWithRoutes,
		RouteChildrenProps,
		PropsWithChildren {
	routes?: IRoute[]
}
