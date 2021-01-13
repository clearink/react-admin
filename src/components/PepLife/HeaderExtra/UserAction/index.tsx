import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import useTypedSelector from "@/hooks/useTypedSelector"
import LoginUtil from "@/utils/store/LoginUtil"
import { Dropdown, Menu, Spin } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import { FieldAvatar } from "@/components/BigSight"

// 退出登录
function UserAction() {
	const user = useTypedSelector((state) => state.user.user)
	const handleLogout = () => {
		// 清除 token
		LoginUtil.clearToken()
	}
	const menu = (
		<Menu>
			<Menu.Item key='3' onClick={handleLogout} icon={<LogoutOutlined />}>
				退出登录
			</Menu.Item>
		</Menu>
	)
	return (
		<Dropdown overlay={menu} trigger={['click']} 	getPopupContainer={(trigger) => trigger.parentElement!}> 
			<span className='header_action px-3 flex items-center cursor-pointer'>
				<FieldAvatar text={user?.avatar} />
				<span>{user?.username ?? <Spin />}</span>
			</span>
		</Dropdown>
	)
}
export default memo(UserAction)
