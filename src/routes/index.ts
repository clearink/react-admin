import { IRoute } from "@/@types/route"
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
				component: withLazyLoad(lazy(() => import("@/pages/Home"))),
			},
			{
				path: "/monitor",
				icon: "icon-computer",
				title: "监控分析",
				hideChildren: true,
				component: withLazyLoad(
					lazy(() => import("@/layouts/MonitorLayout"))
				),
				routes: [
					{
						path: "/monitor",
						component: withLazyLoad(
							lazy(() => import("@/pages/Monitor"))
						),
					},
					{
						path: "/monitor/alarm",
						component: withLazyLoad(
							lazy(() => import("@/pages/Monitor/AlarmRecord"))
						),
					},
					{
						path: "/monitor/analysis",
						component: withLazyLoad(
							lazy(() => import("@/pages/Monitor/Analysis"))
						),
					},
					{
						path: "/monitor/sleep/:id",
						component: withLazyLoad(
							lazy(() => import("@/pages/Monitor/SleepRecord"))
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
					lazy(() => import("@/layouts/BedAllotLayout"))
				),
				routes: [
					{
						path: "/bedallot",
						component: withLazyLoad(
							lazy(() => import("@/pages/BedAllot"))
						),
					},
					{
						path: "/bedallot/room",
						component: withLazyLoad(
							lazy(() => import("@/pages/RoomAllot"))
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
					lazy(() => import("@/pages/Resident/Layout"))
				),
				routes: [
					{
						path: "/resident",
						component: withLazyLoad(
							lazy(() => import("@/pages/Resident"))
						),
					},
					{
						path: "/resident/:id",
						component: withLazyLoad(
							lazy(() => import("@/pages/Resident/ResidentDetail"))
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
					lazy(() => import("@/pages/Nurse/Layout"))
				),
				routes: [
					{
						path: "/nurse",
						component: withLazyLoad(lazy(() => import("@/pages/Nurse"))),
					},
					{
						path: "/nurse/setting",
						component: withLazyLoad(
							lazy(() => import("@/pages/Nurse/NurseSetting"))
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
					lazy(() => import("@/layouts/DeviceLayout"))
				),
				routes: [
					{
						path: "/device",
						component: withLazyLoad(lazy(() => import("@/pages/Device"))),
					},
					{
						path: "/device/remind",
						component: withLazyLoad(
							lazy(() => import("@/pages/DeviceRemind"))
						),
					},
				],
			},
			{
				path: "/dashboard",
				title: "工作台",
				icon: "icon-dashboard",
				component: withLazyLoad(lazy(() => import("@/pages/DashBoard"))),
			},
		],
	},
]

export default routes
