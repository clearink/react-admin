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


	function find(config: TMenu[], path: TBreadcrumb[]) {
		for (let item of config) {
			if (item.routes) {
				const newPath = path.concat({
					path: `${item.path}?_t=${Math.random()}`,
					breadcrumbName: item.title,
				} as TBreadcrumb)
				find(item.routes, newPath)
			} else if (matchPath(pathname, { path: item.path, exact: true })) {
				return result.push(...path, {
					path: item.path as string,
					breadcrumbName: item.title as string,
				})
			}
		}
	}
	find(config, path)
	// 去重 过滤
	return unique<TBreadcrumb>(result, "breadcrumbName").filter(
		(item) => item.breadcrumbName
	)
}

// 需要在routes里配置相应的path与title, 否则不会自动生成面包屑

// FindBreadcrumb 函数 根据 pathname split('/') 层级查找 menu 中的数据
// Q 该方式如何去匹配父子path相同的情况呢?
// A 在匹配到父级时,可以从其父级开始继续往后查找
//

//   pathname 层级代表路由的层级,分割后去匹配对应的路由
// export default function FindBreadcrumb(
// 	config: TMenu[],
// 	pathname: string
// ): TBreadcrumb[] {
// 	const result: TBreadcrumb[] = []
// 	const splitList = SplitPath(pathname)
// 	console.log(splitList)
// 	function find(config: TMenu[], index: number) {
// 		if (!config || index >= splitList.length) return
// 		for (let item of config) {
// 			if (item.redirect) continue
// 			if (
// 				item.path &&
// 				matchPath(splitList[index], { path: item.path, exact: true })
// 			) {
// 				result.push({
// 					path: item.path,
// 					breadcrumbName: item.title as string,
// 				})
// 				if (item.routes) {
// 					// 防止父级路由与子相同时匹配不到
// 					find(item.routes, index)
// 					find(item.routes, index + 1)
// 				}
// 			}
// 		}
// 	}
// 	find(config, 0)

// 	// 去重 过滤
// 	return unique<TBreadcrumb>(result, "path").filter(
// 		(item) => item.breadcrumbName
// 	)
// }
