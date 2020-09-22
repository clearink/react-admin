import React, {
	ComponentType,
	createElement,
	memo,
	ReactComponentElement,
} from "react"
import { Menu, Button, Layout, message } from "antd"
import logo from "@/assets/images/logo.png"
import {
	DashboardOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	FormOutlined,
} from "@ant-design/icons"
import useBoolean from "@/hooks/useBoolean"
import { NavLink } from "react-router-dom"
interface IProps {}

type TMenu = {
	title: string
	key: string
	menu?: TMenu[]
	icon?: ComponentType<any>
}
const menuConfig: TMenu[] = [
	{
		title: "Dashboard",
		key: "/dashboard",
		icon: DashboardOutlined,
		menu: [
			{
				title: "分析页",
				key: "/dashboard/analysis",
			},
			{
				title: "监控页",
				key: "/dashboard/monitor",
			},
			{
				title: "工作台",
				key: "/dashboard/workplace",
			},
		],
	},
	{
		title: "表单页",
		key: "form",
		icon: FormOutlined,
		menu: [
			{
				title: "基础表单",
				key: "/form/basic-form",
			},
			{
				title: "分步表单",
				key: "/form/step-form",
			},
			{
				title: "高级表单",
				key: "/form/advanced-form",
			},
		],
	},
]
const { Item, SubMenu } = Menu
function SiderMenu(props: IProps) {
	const [collapsed, toggle] = useBoolean()

	return (
		<Layout.Sider collapsed={collapsed} className='sider-menu__wrap'>
			<div className='logo'>
				<img src={logo} alt='logo' />
				<span>clear ink</span>
			</div>
			<Menu className='menu' mode='inline' theme='dark'>
				{renderMenu(menuConfig)}
			</Menu>
			<div className='menu_collapsed__wrap'>
				<Button type='link' onClick={toggle as any}>
					{createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
				</Button>
			</div>
		</Layout.Sider>
	)
}

export default memo(SiderMenu)

// 是否是根据路由数组来渲染side menu ?

function renderMenu(config: typeof menuConfig) {
	return config.map((item) => {
		if (item.menu) {
			return (
				<SubMenu
					title={item.title}
					icon={createElement(item.icon as ComponentType<any>)}
					key={item.key}
				>
					{renderMenu(item.menu)}
				</SubMenu>
			)
		}
		return (
			<Item key={item.key}>
				<NavLink to={item.key}>{item.title}</NavLink>
			</Item>
		)
	})
}
