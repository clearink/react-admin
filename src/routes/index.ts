import Home from "@/pages/Home"
import Login from "@/pages/Login"
import { IRoute } from "@/@types/route"
import Layout from "@/layouts"

const routes: IRoute[] = [
	{
		path: "/",
		component: Layout,
		routes: [
			{
				path: "/",
				exact: true,
				component: Home,
				// layout: BaseLayout,
			},
			{
				path: "/login",
				exact: true,
				component: Login,
				// layout: BaseLayout,
			},
		],
	},
]

export default routes
