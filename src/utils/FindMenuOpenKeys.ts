// 递归查找路径
export default function FindMenuOpenKeys(
	menuConfig: TMenu[],
	pathname: string
): string[] {
	let openKeys: string[] = []
	let path: string[] = []
	function find(menuConfig: TMenu[], pathname: string, path: string[]) {
		for (let item of menuConfig) {
			if (item.menu) {
				find(item.menu, pathname, path.concat(item.path))
			} else if (item.path === pathname) {
				openKeys.push(...path.concat(item.path))
				return path.concat(item.path)
			}
		}
	}
	find(menuConfig, pathname, path)
	return openKeys
}
