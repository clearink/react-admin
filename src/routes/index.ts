import { IRoute } from "@/@types/route"
import WithLazyLoad from "@/hocs/WithLazyLoad"
import { lazy } from "react"

const routes: IRoute[] = [
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
	{
		path: "/",
		component: WithLazyLoad(lazy(() => import("@/layouts/BaseLayout"))),
		routes: [
			// home
			{
				path: "/",
				component: WithLazyLoad(lazy(() => import("@/pages/Home"))),
			},

			// dashboard
			{
				path: "/dashboard",
				component: WithLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
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
						component: WithLazyLoad(
							lazy(() => import("@/pages/DashBoard/Analysis"))
						),
					},
					{
						path: "/dashboard/monitor",
						title: "监控页",
						component: WithLazyLoad(
							lazy(() => import("@/pages/DashBoard/Monitor"))
						),
					},
					{
						path: "/dashboard/workplace",
						title: "工作台",
						component: WithLazyLoad(
							lazy(() => import("@/pages/DashBoard/WorkPlace"))
						),
					},
				],
			},

			// form
			{
				path: "/form",
				component: WithLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
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
						component: WithLazyLoad(
							lazy(() => import("@/pages/Form/BasicForm"))
						),
					},
					{
						path: "/form/step-form",
						title: "分步表单",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Form/StepForm"))
						),
					},
					{
						path: "/form/advanced-form",
						title: "高级表单",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Form/AdvancedForm"))
						),
					},
				],
			},

			// list
			{
				path: "/list",
				component: WithLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				title: "列表页",
				icon: "icon-table",
				routes: [
					{
						path: "/list",
						redirect: "/list/search",
					},
					{
						path: "/list/search",
						component: WithLazyLoad(
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
								component: WithLazyLoad(
									lazy(() => import("@/pages/List/Search/Article"))
								),
							},
							{
								path: "/list/search/projects",
								title: "搜索列表(项目)",
								component: WithLazyLoad(
									lazy(() => import("@/pages/List/Search/Project"))
								),
							},
							{
								path: "/list/search/applications",
								title: "搜索列表(应用)",
								component: WithLazyLoad(
									lazy(() => import("@/pages/List/Search/Application"))
								),
							},
						],
					},
					{
						path: "/list/table-list",
						title: "查询表格",
						hide: true,
						component: WithLazyLoad(
							lazy(() => import("@/layouts/BlankLayout"))
						),
						routes: [
							{
								path: "/list/table-list",
								title: "查询表格",
								component: WithLazyLoad(
									lazy(() => import("@/pages/List/Table"))
								),
							},
							{
								path: "/list/table-list/:id",
								hide: true,
								title: "查询表格详情页",
								component: WithLazyLoad(
									lazy(() => import("@/pages/List/Table/Detail"))
								),
							},
						],
					},

					{
						path: "/list/basic-list",
						title: "标准列表",
						component: WithLazyLoad(lazy(() => import("@/pages/List/Basic"))),
					},
					{
						path: "/list/card-list",
						title: "卡片列表",
						component: WithLazyLoad(lazy(() => import("@/pages/List/Card"))),
					},
				],
			},
			// chart
			{
				path: "/chart",
				title: "表格页",
				icon: "icon-linechart",
				component: WithLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				routes: [
					{
						path: "/chart",
						title: "表格简介",
						component: WithLazyLoad(lazy(() => import("@/pages/Chart"))),
					},
				],
			},
			{
				path: "/canvas",
				title: "画布",
				icon: "icon-huabu",
				component: WithLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				routes: [
					{
						path: "/canvas",
						title: "图片剪裁",
						component: WithLazyLoad(lazy(() => import("@/pages/Canvas"))),
					},
				],
			},
		],
	},
]

export default routes
