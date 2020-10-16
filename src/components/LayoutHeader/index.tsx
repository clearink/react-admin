import React, { memo } from "react"
import { useSelector } from "react-redux"
import { AppState } from "@/store"
import { Menu, Dropdown, Spin, Avatar, Layout } from "antd"
import {
	UserOutlined,
	SettingOutlined,
	LogoutOutlined,
} from "@ant-design/icons"
import { SketchPicker } from "react-color"
import LoginUtil from "@/utils/LoginUtil"
import GetBoundAction from "@/utils/GetBoundAction"
import { actions } from "@/store/reducers/user"
interface IProps {}

const BoundLogout = GetBoundAction(actions.logout)

function LayoutHeader(props: IProps) {
	const { user } = useSelector((state: AppState) => state.user)
	const handleLogout = () => {
		// 清除 token
		LoginUtil.clearToken()
		// 清除 store
		BoundLogout()
	}
	const menu = (
		<Menu>
			<Menu.Item key='1'>
				<UserOutlined />
				个人中心
			</Menu.Item>
			<Menu.Item key='2'>
				<SettingOutlined />
				个人设置
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key='3' onClick={handleLogout}>
				<LogoutOutlined />
				退出登录
			</Menu.Item>
		</Menu>
	)
	return (
		<Layout.Header className='layout-header__content'>
			<Dropdown trigger={["click"]} overlay={<SketchPicker />}>
				<div className='color-picker__wrap px-3'>
					<div className='color-picker'></div>
				</div>
			</Dropdown>
			<Dropdown overlay={menu}>
				<span className='header_action px-3 flex items-center cursor-pointer'>
					<Avatar className='mr-4' src={user?.avatar} alt='avatar' />
					<span>{user?.name ?? <Spin />}</span>
				</span>
			</Dropdown>
			<span className='cursor-pointer px-3'>语言</span>
		</Layout.Header>
	)
}
export default memo(LayoutHeader)
