import { TMenu } from "@/@types/menu"
import { IRoute } from "@/@types/route"
import FilterValue from "@/utils/data/FilterValue"
/**  
path(pin):"/"
icon(pin):"icon-computer"
title(pin):"管理首页"
key(pin):"root😜/"
*/
export interface ServerMenuData {
	icon: string
	id: string
	name: string
	path: string
	children?: ServerMenuData[]
}
export function formatMenuData(data: ServerMenuData[]) {
	return data.reduce((menuData, current) => {
		const menuItem: any = {
			path: current.path,
			icon: current.icon,
			title: current.name,
			key: current.id,
		}
		if (current.children) menuItem.children = formatMenuData(current.children)
		return menuData.concat(menuItem)
	}, [] as ServerMenuData[])
}

export function formatRoutesData(
	routes: IRoute[],
	parentKeys: string = "root"
): TMenu[] {
	if (!Array.isArray(routes)) throw new Error("routes must array")
	return routes.map((route) => {
		// 确保 menu key 全局唯一
		const key = `${parentKeys}😜${route.key ?? route.path}`
		return {
			...FilterValue(route, ["component", "wrap"]),
			key,
			routes: route.routes && formatRoutesData(route.routes, key),
		}
	})
}
