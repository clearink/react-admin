import React, { lazy } from "react"
import { IRoute } from "@/@types/route"
import WithLazyLoad from "@/hocs/WithLazyLoad"
import { Redirect } from "react-router-dom"

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
				component: () => <Redirect to='/dashboard/analysis' />, //重定向到
			},
			{
				path: "/dashboard",
				exact: true,
				component: () => <Redirect to='/dashboard/analysis' />,
			},
			{
				path: "/dashboard/analysis",
				exact: true,
				component: WithLazyLoad(
					lazy(() => import("@/pages/DashBoard/Analysis"))
				),
			},
			{
				path: "/dashboard/monitor",
				exact: true,
				component: WithLazyLoad(
					lazy(() => import("@/pages/DashBoard/Monitor"))
				),
			},
			{
				path: "/dashboard/workplace",
				exact: true,
				component: WithLazyLoad(
					lazy(() => import("@/pages/DashBoard/WorkPlace"))
				),
			},

			// form
			{
				path: "/form",
				exact: true,
				component: () => <Redirect to='/form/basic-form' />,
			},
			{
				path: "/form/basic-form",
				exact: true,
				component: WithLazyLoad(lazy(() => import("@/pages/Form/BasicForm"))),
			},
			{
				path: "/form/step-form",
				exact: true,
				component: WithLazyLoad(lazy(() => import("@/pages/Form/StepForm"))),
			},
			{
				path: "/form/advanced-form",
				exact: true,
				component: WithLazyLoad(
					lazy(() => import("@/pages/Form/AdvancedForm"))
				),
			},

			// list
			{
				path: "/list",
				component: WithLazyLoad(lazy(() => import("@/pages/List"))),
				routes: [
					{
						path: "/list",
						exact: true,
						component: () => <Redirect to='/list/search' />,
					},
					{
						path: "/list/search",
						component: WithLazyLoad(lazy(() => import("@/pages/List/Search"))),
						routes: [
							{
								path: "/list/search",
								exact: true,
								component: () => <Redirect to='/list/search/articles' />,
							},
							{
								path: "/list/search/articles",
								exact: true,
								component: WithLazyLoad(
									lazy(() => import("@/pages/List/Search/Article"))
								),
							},
							{
								path: "/list/search/projects",
								exact: true,
								component: WithLazyLoad(
									lazy(() => import("@/pages/List/Search/Project"))
								),
							},
							{
								path: "/list/search/applications",
								exact: true,
								component: WithLazyLoad(
									lazy(() => import("@/pages/List/Search/Application"))
								),
							},
						],
					},
					{
						path: "/list/table-list",
						exact: true,
						component: WithLazyLoad(lazy(() => import("@/pages/List/Table"))),
					},
					{
						path: "/list/basic-list",
						exact: true,
						component: WithLazyLoad(lazy(() => import("@/pages/List/Basic"))),
					},
					{
						path: "/list/card-list",
						exact: true,
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
