import { ComponentType, FunctionComponent } from "react"

interface IWithRoutes {
	routes?: IRoute[]
	[key: string]: any
}
interface IRoute {
	path?: string
	component: any
	wrap?: FunctionComponent
	routes?: IRoute[]
	exact?: boolean
	icon?: ComponentType<any>
	title?: string
	[key: string]: any
}
