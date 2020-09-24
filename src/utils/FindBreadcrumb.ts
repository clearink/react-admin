// 递归查找路径
type TBreadcrumb = { path: string; breadcrumbName: string }
export default function FindBreadcrumb(
	config: TMenu[],
	pathname: string
): TBreadcrumb[] {
	const result: TBreadcrumb[] = []
	const path: TBreadcrumb[] = []
	function find(config: TMenu[], pathname: string, path: TBreadcrumb[]) {
		for (let item of config) {
			if (item.menu) {
				find(
					item.menu,
					pathname,
					path.concat({ path: item.path, breadcrumbName: item.title })
				)
			} else if (item.path === pathname) {
				result.push(
					{
						path: "/",
						breadcrumbName: "首页",
					},
					...path,

					{ path: item.path, breadcrumbName: item.title }
				)
				return
			}
		}
	}
	find(config, pathname, path)
	return result
}
