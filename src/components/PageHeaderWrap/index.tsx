import React, { useCallback, useMemo } from "react"
import useTypedSelector from "@/hooks/useTypedSelector"
import FindBreadcrumb from "@/utils/FindBreadcrumb"
import { PageHeader } from "antd"
import { PageHeaderProps } from "antd/lib/page-header"
import { Link, useLocation } from "react-router-dom"

interface IProps extends PageHeaderProps {}
// 自动获取面包屑的 PageHeader
function PageHeaderWrap(props: IProps) {
	const { menu } = useTypedSelector((state) => state.menu)
	const { pathname } = useLocation()
	const routes = useMemo(
		() => [
			{
				path: "/",
				breadcrumbName: "首页",
			},
			...FindBreadcrumb(menu, pathname),
		],
		[pathname, menu]
	)

	// 自定义面包屑路由
	const itemRender = useCallback((route, params, routes, paths) => {
		const first = routes.length && routes[0] === route
		return first ? (
			<Link to={route.path}>{route.breadcrumbName}</Link>
		) : (
			<span>{route.breadcrumbName}</span>
		)
	}, [])
	return (
		<PageHeader
			{...props}
			breadcrumb={{
				itemRender,
				routes,
			}}
		/>
	)
}

export default PageHeaderWrap
