import React, {
	ComponentType,
	createElement,
	memo,
	useLayoutEffect,
	useState,
} from "react"
import { Menu, Button, Layout } from "antd"
import logo from "@/assets/images/logo.png"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import useBoolean from "@/hooks/useBoolean"
import { NavLink, useLocation } from "react-router-dom"
import menuConfig from "@/configs/menu"
import FindMenuOpenKeys from "@/utils/FindMenuOpenKeys"

const { Item, SubMenu } = Menu
function SiderMenu() {
	const [collapsed, toggle] = useBoolean(false)
	const { pathname } = useLocation()
	const [openKeys, setOpenKeys] = useState(() =>
		FindMenuOpenKeys(menuConfig, pathname)
	)

	// 切换 路由时重新设置 open keys
	useLayoutEffect(() => {
		if (!collapsed) {
			setOpenKeys(FindMenuOpenKeys(menuConfig, pathname))
		}
	}, [pathname, collapsed])

	// 点击事件
	const handleMenuChange = (keys: string[]) => {
		setOpenKeys(keys)
	}
	const handleToggleMenu = () => {
		setOpenKeys([])
		toggle()
	}
	return (
		<Layout.Sider
			collapsedWidth={48}
			collapsed={collapsed}
			onCollapse={handleToggleMenu}
			collapsible
			className='sider-menu__wrap'
		>
			<div className='logo'>
				<img src={logo} alt='logo' />
				{!collapsed && <span>clear ink</span>}
			</div>
			<Menu
				onOpenChange={handleMenuChange as any}
				className='menu'
				mode='inline'
				theme='dark'
				defaultOpenKeys={openKeys}
				openKeys={openKeys}
				selectedKeys={[pathname]}
			>
				{renderMenu(menuConfig)}
			</Menu>
		</Layout.Sider>
	)
}

export default memo(SiderMenu)

// 是否是根据路由数组来渲染side menu ?

function renderMenu(config: TMenu[]) {
	return config?.map((item) => {
		if (item.menu) {
			return (
				<SubMenu
					title={item.title}
					icon={item?.icon && createElement(item.icon as ComponentType<any>)}
					key={item.path}
				>
					{renderMenu(item.menu)}
				</SubMenu>
			)
		}
		return (
			<Item key={item.path}>
				<NavLink to={item.path}>{item.title}</NavLink>
			</Item>
		)
	})
}
