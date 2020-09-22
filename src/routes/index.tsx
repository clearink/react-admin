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
				path:"/dashboard",
				component:WithLazyLoad(
					lazy(()=>)
				)
			}
			{
				path: "/dashboard/analysis",
				exact: true,
				component: WithLazyLoad(
					lazy(() => import("@/pages/DashBoard/Analysis"))
				), //重定向到
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

			{
				key: "error",
				component: WithLazyLoad(lazy(() => import("@/pages/404"))),
			},
		],
	},
]

export default routes
