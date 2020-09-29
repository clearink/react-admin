import { TMenu } from "@/@types/menu"
import { matchPath } from "react-router-dom"
import SplitPath from "./SplitPath"
import unique from "./unique"

// 递归查找路径
/**
 *
 * @param config
 * @param pathname
 *
 * findOpen 函数根据 pathname 层级 递归 查找 openKeys
 *
 */
// export default function FindMenuOpenKeys(
// 	config: TMenu[],
// 	pathname: string
// ): string[] {
// 	let openKeys: string[] = []
// 	let keys: string[] = []
// 	function find(config: TMenu[], keys: string[]) {
// 		for (let item of config) {
// 			if (item.routes) {
// 				find(item.routes, keys.concat(item.key as string))
// 			} else if (
// 				item.path &&
// 				matchPath(pathname, { path: item.path, exact: true })
// 			) {
// 				return openKeys.push(...keys.concat(item.key as string))
// 			}
// 		}
// 	}
// 	find(config, keys)
// 	return unique(openKeys)
// }

export default function FindMenuOpenKeys(
	config: TMenu[],
	pathname: string
): string[] {
	const openKeys: string[] = []
	const splitList = SplitPath(pathname)
	function find(config: TMenu[], index: number) {
		if (!config) return
		for (let item of config) {
			if (item.redirect) continue
			if (matchPath(splitList[index], { path: item.path, exact: true })) {
				openKeys.push(item.key as string)
				if (item.routes) {
					// 防止父级路由与子相同时匹配不到
					find(item.routes, index)
					find(item.routes, index + 1)
				}
			}
		}
	}
	find(config, 0)
	return unique(openKeys)
}
