import { IRoute } from "@/@types/route"
import CommonWrap from "@/components/PepLife/CommonWrap"
import withLazyLoad from "@/hocs/withLazyLoad"
import { lazy } from "react"

const routes: IRoute[] = [
	// 通用登录组件
	{
		path: "/login",
		component: withLazyLoad(lazy(() => import("@/pages/Login"))),
	},
	// 后台管理
	{
		path: "/",
		component: withLazyLoad(lazy(() => import("@/layouts/AdminLayout"))),
		routes: [
			// home
			{
				path: "/",
				icon: "icon-computer",
				title: "管理首页",
				component: withLazyLoad(lazy(() => import("@/pages/Admin/Home"))),
			},
			{
				path: "/monitor",
				icon: "icon-computer",
				title: "监控分析",
				hideChildren: true,
				component: withLazyLoad(
					lazy(() => import("@/pages/Admin/Monitor/Layout"))
				),
				routes: [
					{
						path: "/monitor",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Monitor"))
						),
					},
					{
						path: "/monitor/alarm",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Monitor/AlarmRecord"))
						),
					},
					{
						path: "/monitor/analysis",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Monitor/Analysis"))
						),
					},
					{
						path: "/monitor/sleep/:id",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Monitor/SleepRecord"))
						),
					},
				],
			},
			{
				path: "/bedallot",
				icon: "icon-computer",
				title: "床位分配",
				hideChildren: true,
				component: withLazyLoad(
					lazy(() => import("@/pages/Admin/BedAllot/Layout"))
				),
				routes: [
					{
						path: "/bedallot",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/BedAllot"))
						),
					},
					{
						path: "/bedallot/room",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/BedAllot/RoomAllot"))
						),
					},
				],
			},
			{
				path: "/resident",
				icon: "icon-computer",
				title: "住户管理",
				hideChildren: true,
				component: withLazyLoad(
					lazy(() => import("@/pages/Admin/Resident/Layout"))
				),
				routes: [
					{
						path: "/resident",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Resident"))
						),
					},
					{
						path: "/resident/:id",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Resident/ResidentDetail"))
						),
					},
				],
			},
			{
				path: "/nurse",
				icon: "icon-computer",
				title: "护管管理",
				hideChildren: true,
				component: withLazyLoad(
					lazy(() => import("@/pages/Admin/Nurse/Layout"))
				),
				routes: [
					{
						path: "/nurse",
						component: withLazyLoad(lazy(() => import("@/pages/Admin/Nurse"))),
					},
					{
						path: "/nurse/setting",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Nurse/NurseSetting"))
						),
					},
				],
			},
			{
				path: "/device",
				icon: "icon-computer",
				title: "设备管理",
				hideChildren: true,
				component: withLazyLoad(
					lazy(() => import("@/pages/Admin/Device/Layout"))
				),
				routes: [
					{
						path: "/device",
						component: withLazyLoad(lazy(() => import("@/pages/Admin/Device"))),
					},
					{
						path: "/device/remind",
						component: withLazyLoad(
							lazy(() => import("@/pages/Admin/Device/Remind"))
						),
					},
				],
			},
			{
				path: "/dashboard",
				title: "工作台",
				icon: "icon-dashboard",
				component: withLazyLoad(lazy(() => import("@/pages/Admin/DashBoard"))),
			},
		],
	},
]

export default routes
