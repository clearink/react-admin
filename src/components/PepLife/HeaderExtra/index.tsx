import React, { memo } from "react"
import UserAction from "./UserAction"
import UserAlarm from "./UserAlarm"

// 基础头部 右侧用户操作
function HeaderExtra() {
	return (
		<div className='flex items-center'>
			<UserAlarm />
			<UserAction />
		</div>
	)
}
export default memo(HeaderExtra)
