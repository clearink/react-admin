import { IRoute } from "@/@types/route"

const routes: IRoute[] = [
	{
		path: "/login",
		component: "@/layouts/LoginLayout",
		routes: [
			{
				path: "/login",
				exact: true,
				component: "@/pages/Login",
			},
		],
	},
	{
		path: "/",
		component: "@/layouts/BaseLayout",
		routes: [
			{
				path: "/",
				exact: true,
				redirect: "/dashboard/analysis", //重定向到
			},
			{
				path: "/dashboard",
				exact: true,
				redirect: "/dashboard/analysis",
			},
			{
				path: "/dashboard/analysis",
				exact: true,
				component: "@/pages/DashBoard/Analysis",
			},
			{
				path: "/dashboard/monitor",
				exact: true,
				component: "@/pages/DashBoard/Monitor",
			},
			{
				path: "/dashboard/workplace",
				exact: true,
				component: "@/pages/DashBoard/WorkPlace",
			},

			// form
			{
				path: "/form",
				exact: true,
				redirect: "/form/basic-form",
			},
			{
				path: "/form/basic-form",
				exact: true,
				component: "@/pages/Form/BasicForm",
			},
			{
				path: "/form/step-form",
				exact: true,
				component: "@/pages/Form/StepForm",
			},
			{
				path: "/form/advanced-form",
				exact: true,
				component: "@/pages/Form/AdvancedForm",
			},

			// list
			{
				path: "/list",
				component: "@/pages/List",
				routes: [
					{
						path: "/list",
						exact: true,
						redirect: "/list/search",
					},
					{
						path: "/list/search",
						component: "@/pages/List/Search",
						routes: [
							{
								path: "/list/search",
								exact: true,
								redirect: "/list/search/articles",
							},
							{
								path: "/list/search/articles",
								exact: true,
								component: "@/pages/List/Search/Article",
							},
							{
								path: "/list/search/projects",
								exact: true,
								component: "@/pages/List/Search/Project",
							},
							{
								path: "/list/search/applications",
								exact: true,
								component: "@/pages/List/Search/Application",
							},
						],
					},
					{
						path: "/list/table-list",
						exact: true,
						component: "@/pages/List/Table",
					},
					{
						path: "/list/basic-list",
						exact: true,
						component: "@/pages/List/Basic",
					},
					{
						path: "/list/card-list",
						exact: true,
						component: "@/pages/List/Card",
					},
				],
			},

			{
				key: "error",
				component: "@/pages/404",
			},
		],
	},
]

export default routes
