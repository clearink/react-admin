import { TMenu } from "@/@types/menu"
import { matchPath } from "react-router-dom"
import unique from "./unique"

// 递归查找路径 面包屑
// 需要在routes里配置相应的path与title, 否则不会自动生成面包屑
export default function FindBreadcrumb(
	config: TMenu[],
	pathname: string
): TBreadcrumb[] {
	const result: TBreadcrumb[] = []
	const path: TBreadcrumb[] = []
	function find(config: TMenu[], pathname: string, path: TBreadcrumb[]) {
		for (let item of config) {
			if (item.routes) {
				const newPath = path.concat({
					path: item.path,
					breadcrumbName: item.title,
				} as TBreadcrumb)
				find(item.routes, pathname, newPath)
			} else if (
				item.path &&
				matchPath(pathname, { path: item.path, exact: true })
			) {
				return result.push(...path, {
					path: item.path,
					key: item.key,
					breadcrumbName: item.title as string,
				})
			}
		}
	}
	find(config, pathname, path)
	// console.log(result) // 根据path去重
	// 去除 breadcrumbName 为空的
	return unique<TBreadcrumb>(result, "path").filter(
		(item) => item.breadcrumbName
	)
}
