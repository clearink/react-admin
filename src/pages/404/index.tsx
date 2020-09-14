import React from "react"
import { Button, Result } from "antd"
import { Link } from "react-router-dom"

function Error() {
	return (
		<Result
			status='404'
			title='找不到页面'
			extra={
				<Button type='primary'>
					<Link to='/'>返回首页</Link>
				</Button>
			}
		/>
	)
}

export default Error
