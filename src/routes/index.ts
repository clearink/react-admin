import Home from "@/pages/Home"
import Login from "@/pages/Login"
import BaseLayout from "@/layouts/BaseLayout"
import { IRoute } from "@/@types/route"

const routes: IRoute[] = [
	{
		path: "/",
		exact: true,
		component: BaseLayout,
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
