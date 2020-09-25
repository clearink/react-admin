import { IRoute } from '@/@types/route'

// 递归查找路径
export default function FindMenuOpenKeys(
	menuConfig: IRoute[],
	pathname: string
): string[] {
	let openKeys: string[] = []
	let path: string[] = []
	function find(menuConfig: IRoute[], pathname: string, path: string[]) {
		for (let item of menuConfig) {
			if (item.routes) {
				find(item.routes, pathname, path.concat(item.path as string))
			} else if (item.path === pathname) {
				openKeys.push(...path.concat(item.path))
				return path.concat(item.path)
			}
		}
	}
	find(menuConfig, pathname, path)
	return openKeys
}
