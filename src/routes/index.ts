import { IRoute } from "@/@types/route"
import withLazyLoad from "@/hocs/withLazyLoad"
import { lazy } from "react"

const routes: IRoute[] = [
	// 通用登录组件
	{
		path: "/login",
		component: withLazyLoad(lazy(() => import("@/pages/Login"))),
	},
	// 后台管理
	{
		path: "/",
		component: withLazyLoad(lazy(() => import("@/layouts/AdminLayout"))),
		routes: [
			// home
			{
				path: "/",
				icon: "icon-computer",
				title: "管理首页",
				component: withLazyLoad(lazy(() => import("@/pages/Admin/Home"))),
			},
			{
				path: "/monitor",
				icon: "icon-computer",
				title: "监控分析",
				hideChildren:true,
				component: withLazyLoad(
					lazy(() => import("@/pages/Admin/Monitor/Layout"))
				),
				routes: [
					{
						path: "/monitor",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Monitor"))
						),
					},
					{
						path: "/monitor/alarm",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Monitor/AlarmRecord"))
						),
					},
					{
						path: "/monitor/analysis",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Monitor/Analysis"))
						),
					},
				],
			},

			// dashboard
			{
				path: "/dashboard",
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				title: "Dashboard",
				icon: "icon-dashboard",
				routes: [
					{
						path: "/dashboard",
						redirect: "/dashboard/analysis", //重定向到
					},
					{
						path: "/dashboard/analysis",
						title: "分析页",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/DashBoard/Analysis"))
						),
					},
					{
						path: "/dashboard/monitor",
						title: "监控页",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/DashBoard/Monitor"))
						),
					},
					{
						path: "/dashboard/workplace",
						title: "工作台",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/DashBoard/WorkPlace"))
						),
					},
				],
			},

			// form
			{
				path: "/form",
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				title: "表单页",
				icon: "icon-edit-square",
				routes: [
					{
						path: "/form",
						redirect: "/form/config-form",
					},
					{
						path: "/form/config-form",
						title: "配置表单",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Form/BasicForm"))
						),
					},
					{
						path: "/form/step-form",
						title: "分步表单",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Form/StepForm"))
						),
					},
					{
						path: "/form/advanced-form",
						title: "高级表单",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Form/AdvancedForm"))
						),
					},
				],
			},

			// list
			{
				path: "/list",
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				title: "列表页",
				icon: "icon-table",
				routes: [
					{
						path: "/list",
						redirect: "/list/search",
					},
					{
						path: "/list/search",
						component: withLazyLoad(
							lazy(() => import("@/layouts/BlankLayout"))
						),
						title: "搜索列表",
						routes: [
							{
								path: "/list/search",
								redirect: "/list/search/articles",
							},
							{
								path: "/list/search/articles",
								title: "搜索列表(文章)",
								component: withLazyLoad(
									lazy(() => import("@/pages/Admin/List/Search/Article"))
								),
							},
							{
								path: "/list/search/projects",
								title: "搜索列表(项目)",
								component: withLazyLoad(
									lazy(() => import("@/pages/Admin/List/Search/Project"))
								),
							},
							{
								path: "/list/search/applications",
								title: "搜索列表(应用)",
								component: withLazyLoad(
									lazy(() => import("@/pages/Admin/List/Search/Application"))
								),
							},
						],
					},
					{
						path: "/list/table-list",
						title: "查询表格",
						hide: true,
						component: withLazyLoad(
							lazy(() => import("@/layouts/BlankLayout"))
						),
						routes: [
							{
								path: "/list/table-list",
								title: "查询表格",
								component: withLazyLoad(
									lazy(() => import("@/pages/Admin/List/Table"))
								),
							},
							{
								path: "/list/table-list/:id",
								hide: true,
								title: "查询表格详情页",
								component: withLazyLoad(
									lazy(() => import("@/pages/Admin/List/Table/Detail"))
								),
							},
						],
					},

					{
						path: "/list/basic-list",
						title: "标准列表",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/List/Basic"))
						),
					},
					{
						path: "/list/card-list",
						title: "卡片列表",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/List/Card"))
						),
					},
				],
			},
			// chart
			{
				path: "/chart",
				title: "表格页",
				icon: "icon-linechart",
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				routes: [
					{
						path: "/chart",
						title: "表格简介",
						component: withLazyLoad(lazy(() => import("@/pages/Admin/Chart"))),
					},
				],
			},
			{
				path: "/canvas",
				title: "画布",
				icon: "icon-huabu",
				component: withLazyLoad(lazy(() => import("@/pages/Admin/Canvas"))),
			},
			{
				path: "/sys",
				title: "系统管理",
				icon: "icon-project",
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				routes: [
					{
						path: "/sys/role",
						title: "角色管理",
						icon: "icon-user",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/Role"))
						),
					},
					{
						path: "/sys/user",
						title: "用户管理",
						icon: "icon-user",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/User"))
						),
					},
					{
						path: "/sys/menu",
						title: "菜单管理",
						icon: "icon-menu",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/Menu"))
						),
					},
					{
						path: "/sys/dict",
						title: "字典管理",
						icon: "icon-file",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/Dict"))
						),
					},
					{
						path: "/sys/log",
						title: "日志管理",
						icon: "icon-article",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/Log"))
						),
					},
					{
						path: "/sys/message",
						title: "消息管理",
						icon: "icon-notification",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/Message"))
						),
					},
					{
						path: "/sys/oss",
						title: "OSS管理",
						icon: "icon-image",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/Oss"))
						),
					},
				],
			},
		],
	},
]

export default routes
