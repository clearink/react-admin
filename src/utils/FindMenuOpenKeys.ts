import { TMenu } from "@/@types/menu"
import { matchPath } from "react-router-dom"
import unique from "./unique"

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
 * 这种情况是由于层级的问题 所以应当使用path去匹配,获得 key
 *
 *
 */
export default function FindMenuOpenKeys(
	config: TMenu[],
	pathname: string
): string[] {
	let openKeys: string[] = []
	let keys: string[] = []
	function find(config: TMenu[], pathname: string, keys: string[]) {
		for (let item of config) {
			if (item.routes) {
				find(item.routes, pathname, keys.concat(item.key as string))
			} else if (
				item.path &&
				matchPath(pathname, { path: item.path, exact: true })
			) {
				return openKeys.push(...keys.concat(item.key as string))
			}
		}
	}
	find(config, pathname, keys)
	return unique(openKeys)
}
