import { lazy } from "react"
import { IRoute } from "@/@types/route"
import WithLazyLoad from "@/hocs/WithLazyLoad"

const routes: IRoute[] = [
	{
		path: "/",
		component: WithLazyLoad(lazy(() => import("@/layouts"))),
		routes: [
			{
				path: "/",
				exact: true,
				component: WithLazyLoad(lazy(() => import("@/pages/Home"))),
			},
			{
				path: "/login",
				exact: true,
				component: WithLazyLoad(lazy(() => import("@/pages/Login"))),
			},
			{
				key: "error",
				component: WithLazyLoad(lazy(() => import("@/pages/404"))),
			},
		],
	},
]

export default routes
