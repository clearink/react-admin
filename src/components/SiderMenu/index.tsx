import React, { memo, useEffect, useMemo, useState } from "react"
import { Menu, Layout, Typography, Skeleton, Spin } from "antd"
import logo from "@/assets/images/logo.png"
import classNames from "classnames"
import { Link, useLocation } from "react-router-dom"
import FindMenuOpenKeys from "@/utils/menu/FindMenuOpenKeys"
import useTypedSelector from "@/hooks/useTypedSelector"
import GetBoundAction from "@/utils/store/GetBoundAction"
import RenderMenu from "./RenderMenu"
import { actions } from "@/store/reducers/menu"
import "./style.scss"

const boundToggle = GetBoundAction(actions.toggle)
const theme = "light"
function SiderMenu() {
	const [collapsedMenu, setCollapsedMenu] = useState(false)
	const { menu, collapsed } = useTypedSelector((state) => state.menu)
	const { user } = useTypedSelector((state) => state.user)
	const { pathname } = useLocation()
	const [openKeys, setOpenKeys] = useState<string[]>([]) // 当前打开的菜单
	const [selectKeys, setSelectKeys] = useState<string[]>([]) // 当前选中的菜单

	// 切换路由时 重新设置 open keys
	useEffect(() => {
		const newKeys = FindMenuOpenKeys(menu, pathname)
		if (!collapsed) {
			setOpenKeys(newKeys)
		} else {
			setOpenKeys([])
		}
		setSelectKeys(newKeys)
	}, [pathname, collapsed, menu])

	// 防止子菜单意外出现在别的位置
	// 和 collapsed 的更新不在同一个事件循环
	useEffect(() => {
		setCollapsedMenu(collapsed)
	}, [collapsed])

	const menuItemList = useMemo(() => RenderMenu(menu), [menu])
	return (
		<>
			<div
				className={classNames("sider-menu__placeholder", {
					collapsed,
				})}
			/>
			<Layout.Sider
				collapsible
				collapsedWidth={48}
				collapsed={collapsedMenu}
				onCollapse={boundToggle}
				breakpoint='lg'
				className='sider-menu__wrap'
				theme={theme}
			>
				<Link
					className={classNames("logo", {
						collapsed,
					})}
					to='/'
				>
					{user && (
						<>
							<img src={user?.sysDepart.logo} alt='logo' />
							<Typography.Text ellipsis title={user?.sysDepart.departName}>
								{user?.sysDepart.departName}
							</Typography.Text>
						</>
					)}
				</Link>
				<Menu
					onOpenChange={setOpenKeys as any} // 点击事件
					className='menu'
					mode='inline'
					inlineIndent={16}
					theme={theme}
					openKeys={openKeys}
					selectedKeys={selectKeys}
				>
					{menuItemList}
				</Menu>
			</Layout.Sider>
		</>
	)
}

export default memo(SiderMenu)
