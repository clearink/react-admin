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
	/* 在菜单中隐藏子菜单 */
	hideChildren?:boolean
	[key: string]: any
}
