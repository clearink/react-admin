import Home from "@/pages/Home"
import Login from "@/pages/Login"
import { IRoute } from "@/@types/route"
import Layout from "@/layouts"
import Error from "@/pages/404"

const routes: IRoute[] = [
	{
		path: "/",
		component: Layout,
		routes: [
			{
				path: "/",
				exact: true,
				component: Home,
			},
			{
				path: "/login",
				exact: true,
				component: Login,
			},
			{
				path: undefined,
				component: Error,
			},
		],
	},
]

export default routes
