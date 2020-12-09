import { IRoute } from "@/@types/route"
import withLazyLoad from "@/hocs/withLazyLoad"
import { lazy } from "react"

const routes: IRoute[] = [
	// 通用登录组件
	{
		path: "/login",
		component: withLazyLoad(lazy(() => import("@/layouts/LoginLayout"))),
		routes: [
			{
				path: "/login",
				component: withLazyLoad(lazy(() => import("@/pages/Login"))),
			},
		],
	},

	// 后台管理
	{
		path: "/admin",
		component: withLazyLoad(lazy(() => import("@/layouts/AdminLayout"))),
		routes: [
			// home
			{
				path: "/admin",
				component: withLazyLoad(lazy(() => import("@/pages/Admin/Home"))),
			},

			// 	博客管理
			{
				path: "/admin/article",
				title: "博客管理",
				icon: "icon-article",
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				routes: [
					{
						path: "/admin/article",
						title: "博客列表",
						component: withLazyLoad(lazy(() => import("@/pages/Blog/Article"))),
					},
					{
						path: "/admin/article/new",
						title: "新建博客",
						component: withLazyLoad(
							lazy(() => import("@/pages/Blog/Article/Add"))
						),
					},
				],
			},

			// dashboard
			{
				path: "/admin/dashboard",
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
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
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/DashBoard/Analysis"))
						),
					},
					{
						path: "/admin/dashboard/monitor",
						title: "监控页",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/DashBoard/Monitor"))
						),
					},
					{
						path: "/admin/dashboard/workplace",
						title: "工作台",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/DashBoard/WorkPlace"))
						),
					},
				],
			},

			// form
			{
				path: "/admin/form",
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
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
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Form/BasicForm"))
						),
					},
					{
						path: "/admin/form/step-form",
						title: "分步表单",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Form/StepForm"))
						),
					},
					{
						path: "/admin/form/advanced-form",
						title: "高级表单",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Form/AdvancedForm"))
						),
					},
					{
						path: "/admin/form/hook-form",
						title: "RHF表单",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Form/HookForm"))
						),
					},
				],
			},

			// list
			{
				path: "/admin/list",
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				title: "列表页",
				icon: "icon-table",
				routes: [
					{
						path: "/admin/list",
						redirect: "/list/search",
					},
					{
						path: "/admin/list/search",
						component: withLazyLoad(
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
								component: withLazyLoad(
									lazy(() => import("@/pages/Admin/List/Search/Article"))
								),
							},
							{
								path: "/admin/list/search/projects",
								title: "搜索列表(项目)",
								component: withLazyLoad(
									lazy(() => import("@/pages/Admin/List/Search/Project"))
								),
							},
							{
								path: "/admin/list/search/applications",
								title: "搜索列表(应用)",
								component: withLazyLoad(
									lazy(() => import("@/pages/Admin/List/Search/Application"))
								),
							},
						],
					},
					{
						path: "/admin/list/table-list",
						title: "查询表格",
						hide: true,
						component: withLazyLoad(
							lazy(() => import("@/layouts/BlankLayout"))
						),
						routes: [
							{
								path: "/admin/list/table-list",
								title: "查询表格",
								component: withLazyLoad(
									lazy(() => import("@/pages/Admin/List/Table"))
								),
							},
							{
								path: "/admin/list/table-list/:id",
								hide: true,
								title: "查询表格详情页",
								component: withLazyLoad(
									lazy(() => import("@/pages/Admin/List/Table/Detail"))
								),
							},
						],
					},

					{
						path: "/admin/list/basic-list",
						title: "标准列表",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/List/Basic"))
						),
					},
					{
						path: "/admin/list/card-list",
						title: "卡片列表",
						component: withLazyLoad(
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
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				routes: [
					{
						path: "/admin/chart",
						title: "表格简介",
						component: withLazyLoad(lazy(() => import("@/pages/Admin/Chart"))),
					},
				],
			},
			{
				path: "/admin/canvas",
				title: "画布",
				icon: "icon-huabu",
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				routes: [
					{
						path: "/admin/canvas",
						title: "图片剪裁",
						component: withLazyLoad(lazy(() => import("@/pages/Admin/Canvas"))),
					},
				],
			},
			{
				path: "/admin/sys",
				title: "系统管理",
				icon: "icon-project",
				component: withLazyLoad(lazy(() => import("@/layouts/BlankLayout"))),
				routes: [
					{
						path: "/admin/sys/role",
						title: "角色管理",
						icon: "icon-user",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/Role"))
						),
					},
					{
						path: "/admin/sys/user",
						title: "用户管理",
						icon: "icon-user",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/User"))
						),
					},
					{
						path: "/admin/sys/menu",
						title: "菜单管理",
						icon: "icon-menu",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/Menu"))
						),
					},
					{
						path: "/admin/sys/dict",
						title: "字典管理",
						icon: "icon-file",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/Dict"))
						),
					},
					{
						path: "/admin/sys/log",
						title: "日志管理",
						icon: "icon-article",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/Log"))
						),
					},
					{
						path: "/admin/sys/message",
						title: "消息管理",
						icon: "icon-notification",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/Message"))
						),
					},
					{
						path: "/admin/sys/oss",
						title: "OSS管理",
						icon: "icon-image",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/System/Oss"))
						),
					},
				],
			},
		],
	},

	// 前端页面
	{
		path: "/",
		component: withLazyLoad(lazy(() => import("@/layouts/BlogLayout"))),
		routes: [
			{
				path: "/",
				component: withLazyLoad(lazy(() => import("@/pages/Blog/index"))),
			},
			{
				path: "/form-builder",
				title: "表单生成器",
				component: withLazyLoad(lazy(() => import("@/pages/Blog/FormBuilder"))),
			},
		],
	},
]

export default routes
