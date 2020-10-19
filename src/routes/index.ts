import { IRoute } from "@/@types/route"
import WithLazyLoad from "@/hocs/WithLazyLoad"
import { lazy } from "react"

const routes: IRoute[] = [
	// 通用登录组件
	{
		path: "/login",
		component: WithLazyLoad(lazy(() => import("@/layouts/LoginLayout"))),
		routes: [
			{
				path: "/login",
				component: WithLazyLoad(lazy(() => import("@/pages/Login"))),
			},
		],
	},

	// 后台管理
	{
		path: "/admin",
		component: WithLazyLoad(lazy(() => import("@/layouts/AdminLayout"))),
		routes: [
			// home
			{
				path: "/admin",
				component: WithLazyLoad(lazy(() => import("@/pages/Admin/Home"))),
			},

			// 	博客管理
			{
				path: "/admin/article",
				title: "博客管理",
				icon: "icon-article",
				component: WithLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				routes: [
					{
						path: "/admin/article",
						title: "博客列表",
						component: WithLazyLoad(lazy(() => import("@/pages/Blog/Article"))),
					},
					{
						path: "/admin/article/new",
						title: "新建博客",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Blog/Article/Add"))
						),
					},
				],
			},

			// dashboard
			{
				path: "/admin/dashboard",
				component: WithLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				title: "Dashboard",
				icon: "icon-dashboard",
				routes: [
					{
						path: "/admin/dashboard",
						redirect: "/dashboard/analysis", //重定向到
					},
					{
						path: "/admin/dashboard/analysis",
						title: "分析页",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Admin/DashBoard/Analysis"))
						),
					},
					{
						path: "/admin/dashboard/monitor",
						title: "监控页",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Admin/DashBoard/Monitor"))
						),
					},
					{
						path: "/admin/dashboard/workplace",
						title: "工作台",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Admin/DashBoard/WorkPlace"))
						),
					},
				],
			},

			// form
			{
				path: "/admin/form",
				component: WithLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				title: "表单页",
				icon: "icon-edit-square",
				routes: [
					{
						path: "/admin/form",
						redirect: "/form/config-form",
					},
					{
						path: "/admin/form/config-form",
						title: "配置表单",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Admin/Form/BasicForm"))
						),
					},
					{
						path: "/admin/form/step-form",
						title: "分步表单",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Admin/Form/StepForm"))
						),
					},
					{
						path: "/admin/form/advanced-form",
						title: "高级表单",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Admin/Form/AdvancedForm"))
						),
					},
					{
						path: "/admin/form/hook-form",
						title: "React-Hook-Form表单",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Admin/Form/HookForm"))
						),
					},
				],
			},

			// list
			{
				path: "/admin/list",
				component: WithLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				title: "列表页",
				icon: "icon-table",
				routes: [
					{
						path: "/admin/list",
						redirect: "/list/search",
					},
					{
						path: "/admin/list/search",
						component: WithLazyLoad(
							lazy(() => import("@/layouts/BlankLayout"))
						),
						title: "搜索列表",
						routes: [
							{
								path: "/admin/list/search",
								redirect: "/list/search/articles",
							},
							{
								path: "/admin/list/search/articles",
								title: "搜索列表(文章)",
								component: WithLazyLoad(
									lazy(() => import("@/pages/Admin/List/Search/Article"))
								),
							},
							{
								path: "/admin/list/search/projects",
								title: "搜索列表(项目)",
								component: WithLazyLoad(
									lazy(() => import("@/pages/Admin/List/Search/Project"))
								),
							},
							{
								path: "/admin/list/search/applications",
								title: "搜索列表(应用)",
								component: WithLazyLoad(
									lazy(() => import("@/pages/Admin/List/Search/Application"))
								),
							},
						],
					},
					{
						path: "/admin/list/table-list",
						title: "查询表格",
						hide: true,
						component: WithLazyLoad(
							lazy(() => import("@/layouts/BlankLayout"))
						),
						routes: [
							{
								path: "/admin/list/table-list",
								title: "查询表格",
								component: WithLazyLoad(
									lazy(() => import("@/pages/Admin/List/Table"))
								),
							},
							{
								path: "/admin/list/table-list/:id",
								hide: true,
								title: "查询表格详情页",
								component: WithLazyLoad(
									lazy(() => import("@/pages/Admin/List/Table/Detail"))
								),
							},
						],
					},

					{
						path: "/admin/list/basic-list",
						title: "标准列表",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Admin/List/Basic"))
						),
					},
					{
						path: "/admin/list/card-list",
						title: "卡片列表",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Admin/List/Card"))
						),
					},
				],
			},
			// chart
			{
				path: "/admin/chart",
				title: "表格页",
				icon: "icon-linechart",
				component: WithLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				routes: [
					{
						path: "/admin/chart",
						title: "表格简介",
						component: WithLazyLoad(lazy(() => import("@/pages/Admin/Chart"))),
					},
				],
			},
			{
				path: "/admin/canvas",
				title: "画布",
				icon: "icon-huabu",
				component: WithLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				routes: [
					{
						path: "/admin/canvas",
						title: "图片剪裁",
						component: WithLazyLoad(lazy(() => import("@/pages/Admin/Canvas"))),
					},
				],
			},
		],
	},

	// 前端页面
	{
		path: "/",
		component: WithLazyLoad(lazy(() => import("@/layouts/BlogLayout"))),
		routes: [
			{
				path: "/",
				component: WithLazyLoad(lazy(() => import("@/pages/Blog/index"))),
			},
		],
	},
]

export default routes
