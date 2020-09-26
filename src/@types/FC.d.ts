import { IRoute } from "@/@types/route"
import { PropsWithChildren, ReactNode } from "react"
import { RouteChildrenProps } from "react-router-dom"

interface IBaseProps extends RouteChildrenProps, PropsWithChildren {
	routes?: IRoute[]
	children: ReactNode
}
