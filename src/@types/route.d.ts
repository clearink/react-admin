import { ComponentType } from "react"

interface IWithRoutes {
	routes?: IRoute[]
	[key: string]: any
}
interface IRoute {
	path?: string
	component?: string
	redirect?: string
	wrap?: string
	routes?: IRoute[]
	exact?: boolean
	icon?: ComponentType<any>
	title?: string
	[key: string]: any
}
