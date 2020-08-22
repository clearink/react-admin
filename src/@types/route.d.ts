import { IBaseProps } from "./fc"
import { FunctionComponent } from "react"

interface IWithRoutes {
	routes?: IRoute[]
	[key: string]: any
}
interface IRoute {
	path?: string
	component: FunctionComponent<IBaseProps>
	wrap?: FunctionComponent
	routes?: IRoute[]
	exact?: boolean
}
