import menuConfig from "@/configs/menu"
import FindBreadcrumb from "@/utils/FindBreadcrumb"
import { PageHeader } from "antd"
import { PageHeaderProps } from "antd/lib/page-header"
import React, { useCallback, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"

function PageHeaderWrap(props: PageHeaderProps) {
	const { pathname } = useLocation()
	const routes = useMemo(() => FindBreadcrumb(menuConfig, pathname), [pathname])

	// 自定义面包屑路由
	const itemRender = useCallback((route, params, routes, paths) => {
		const first = routes.length && routes[0] === route
		return first ? (
			<Link to={route.path}>{route.breadcrumbName}</Link>
		) : (
			<span>{route.breadcrumbName}</span>
		)
	}, [])

	return <PageHeader {...props} breadcrumb={{ itemRender, routes }} />
}

export default PageHeaderWrap
