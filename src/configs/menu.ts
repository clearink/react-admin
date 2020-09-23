import {
	DashboardOutlined,
	FormOutlined,
	TableOutlined,
} from "@ant-design/icons"
const menuConfig: TMenu[] = [
	{
		title: "Dashboard",
		path: "/dashboard",
		icon: DashboardOutlined,
		menu: [
			{
				title: "分析页",
				path: "/dashboard/analysis",
			},
			{
				title: "监控页",
				path: "/dashboard/monitor",
			},
			{
				title: "工作台",
				path: "/dashboard/workplace",
			},
		],
	},
	{
		title: "表单页",
		path: "form",
		icon: FormOutlined,
		menu: [
			{
				title: "基础表单",
				path: "/form/basic-form",
			},
			{
				title: "分步表单",
				path: "/form/step-form",
			},
			{
				title: "高级表单",
				path: "/form/advanced-form",
			},
		],
	},
	{
		title: "列表页",
		path: "/list",
		icon: TableOutlined,
		menu: [
			{
				title: "搜索列表",
				path: "/list/search",
				menu: [
					{
						title: "搜索列表(文章)",
						path: "/list/search/articles",
					},
					{
						title: "搜索列表(项目)",
						path: "/list/search/projects",
					},
					{
						title: "搜索列表(应用)",
						path: "/list/search/applications",
					},
				],
			},
			{
				title: "查询表格",
				path: "/list/table-list",
			},
			{
				title: "标准列表",
				path: "/list/basic-list",
			},
			{
				title: "卡片列表",
				path: "/list/card-list",
			},
		],
	},
]
export default menuConfig
