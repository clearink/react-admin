// 递归查找路径 面包屑
export default function FindBreadcrumb(
	config: TMenu[],
	pathname: string
): TBreadcrumb[] {
	const result: TBreadcrumb[] = []
	const path: TBreadcrumb[] = []
	function find(config: TMenu[], pathname: string, path: TBreadcrumb[]) {
		for (let item of config) {
			if (item.routes) {
				find(
					item.routes,
					pathname,
					path.concat({
						path: item.path as string,
						breadcrumbName: item.title as string,
					})
				)
			} else if (item.path === pathname) {
				result.push(
					...path, 
					{ path: item.path, breadcrumbName: item.title as string }
				)
				return
			}
		}
	}
	find(config, pathname, path)
	return result
}
