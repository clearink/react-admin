import { IRoute } from '@/@types/route'

// 递归查找路径
export default function FindMenuOpenKeys(
	config: TMenu[],
	pathname: string
): string[] {
	let openKeys: string[] = []
	let path: string[] = []
	function find(config: IRoute[], pathname: string, path: string[]) {
		for (let item of config) {
			if (item.routes) {
				find(item.routes, pathname, path.concat(item.path as string))
			} else if (item.path === pathname) {
				openKeys.push(...path.concat(item.path))
				return path.concat(item.path)
			}
		}
	}
	find(config, pathname, path)
	return openKeys
}
