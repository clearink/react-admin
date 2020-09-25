import { IRoute } from "@/@types/route"
import WithLazyLoad from "@/hocs/WithLazyLoad"
import { DashboardOutlined } from "@ant-design/icons"
import { lazy } from "react"

const routes: IRoute[] = [
	{
		path: "/login",
		component: WithLazyLoad(lazy(() => import("@/layouts/LoginLayout"))),
		routes: [
			{
				path: "/login",
				exact: true,
				component: WithLazyLoad(lazy(() => import("@/pages/Login"))),
			},
		],
	},
	{
		path: "/",
		component: WithLazyLoad(lazy(() => import("@/layouts/BaseLayout"))),
		routes: [
			{
				path: "/",
				exact: true,
				redirect: "/dashboard/analysis", //重定向到
			},

			// dashboard
			{
				path: "/dashboard",
				component: WithLazyLoad(lazy(() => import("@/pages/DashBoard"))),
				title: "Dashboard",
				icon: DashboardOutlined,
				routes: [
					{
						path: "/dashboard",
						exact: true,
						redirect: "/dashboard/analysis", //重定向到
					},
					{
						path: "/dashboard/analysis",
						exact: true,
						title: "分析页",
						component: WithLazyLoad(
							lazy(() => import("@/pages/DashBoard/Analysis"))
						),
					},
					{
						path: "/dashboard/monitor",
						exact: true,
						title: "监控页",
						component: WithLazyLoad(
							lazy(() => import("@/pages/DashBoard/Monitor"))
						),
					},
					{
						path: "/dashboard/workplace",
						exact: true,
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
				component: WithLazyLoad(lazy(() => import("@/pages/Form"))),
				title: "表单页",
				icon: DashboardOutlined,
				routes: [
					{
						path: "/form",
						exact: true,
						redirect: "/form/basic-form",
					},
					{
						path: "/form/basic-form",
						exact: true,
						title: "基础表单",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Form/BasicForm"))
						),
					},
					{
						path: "/form/step-form",
						exact: true,
						title: "分步表单",
						component: WithLazyLoad(
							lazy(() => import("@/pages/Form/StepForm"))
						),
					},
					{
						path: "/form/advanced-form",
						exact: true,
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
				component: WithLazyLoad(lazy(() => import("@/pages/List"))),
				title: "列表页",
				icon: DashboardOutlined,
				routes: [
					{
						path: "/list",
						exact: true,
						redirect: "/list/search",
					},
					{
						path: "/list/search",
						component: WithLazyLoad(lazy(() => import("@/pages/List/Search"))),
						title: "搜索列表",
						routes: [
							{
								path: "/list/search",
								exact: true,
								redirect: "/list/search/articles",
							},
							{
								path: "/list/search/articles",
								exact: true,
								title: "搜索列表(文章)",
								component: WithLazyLoad(
									lazy(() => import("@/pages/List/Search/Article"))
								),
							},
							{
								path: "/list/search/projects",
								exact: true,
								title: "搜索列表(项目)",
								component: WithLazyLoad(
									lazy(() => import("@/pages/List/Search/Project"))
								),
							},
							{
								path: "/list/search/applications",
								exact: true,
								title: "搜索列表(应用)",
								component: WithLazyLoad(
									lazy(() => import("@/pages/List/Search/Application"))
								),
							},
						],
					},
					{
						path: "/list/table-list",
						exact: true,
						title: "查询表格",
						component: WithLazyLoad(lazy(() => import("@/pages/List/Table"))),
					},
					{
						path: "/list/basic-list",
						exact: true,
						title: "标准列表",
						component: WithLazyLoad(lazy(() => import("@/pages/List/Basic"))),
					},
					{
						path: "/list/card-list",
						exact: true,
						title: "卡片列表",
						component: WithLazyLoad(lazy(() => import("@/pages/List/Card"))),
					},
				],
			},

			{
				key: "error",
				component: WithLazyLoad(lazy(() => import("@/pages/404"))),
			},
		],
	},
]

export default routes
