import { ComponentType } from "react"
import { IBaseProps } from "./fc"

interface IRoute {
	path?: string
	component?: ComponentType<IBaseProps>
	redirect?: string
	wrap?: ComponentType<any>
	icon?: string
	routes?: IRoute[]
	title?: string
	key?: string
	hide?: boolean
	[key: string]: any
}
