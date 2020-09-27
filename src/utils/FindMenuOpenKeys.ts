import { TMenu } from "@/@types/menu"
import { matchPath } from "react-router-dom"
import unique from './unique'

// 递归查找路径
/**
 *
 * @param config
 * @param pathname
 *
 * 已知限制
 *
 * 当父级路由与字路由一致时 点击菜单时 selectKeys 会不正确
 *
 * 所以 父级路由菜单和子路由菜单的path不能同时渲染 ×
 * 
 * 这种情况是由于层级的问题 所以可以将父级菜单的key or path 直接加到 子菜单的key上
 */
export default function FindMenuOpenKeys(
	config: TMenu[],
	pathname: string
): string[] {
	let openKeys: string[] = []
	let path: string[] = []
	function find(config: TMenu[], pathname: string, path: string[]) {
		for (let item of config) {
			if (item.routes) {
				find(item.routes, pathname, path.concat(item.path as string))
				// } else if (item.path === pathname) {
			} else if (
				item.path &&
				matchPath(pathname, { path: item.path, exact: true })
			) {
				console.log("匹配到了", item.path)
				openKeys.push(...path.concat(item.path))
				return
			}
		}
	}
	find(config, pathname, path)
	return unique(openKeys)
}
