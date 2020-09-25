import { ComponentType } from "react"
import { IBaseProps } from "./fc"

interface IWithRoutes {
	routes?: IRoute[]
	[key: string]: any
}
interface IRoute {
	path?: string
	component?: ComponentType<IBaseProps>
	redirect?: string
	wrap?: ComponentType<any>
	routes?: IRoute[]
	exact?: boolean
	icon?: string
	title?: string
	[key: string]: any
}
