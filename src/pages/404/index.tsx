import React from "react"
import { Button } from "antd"
import { useHistory } from "react-router-dom"

function Error() {
	const history = useHistory()
	const handleToHome = () => {
		history.push("/")
	}
	return (
		<div>
			<h1>404 Error</h1>
			<Button onClick={handleToHome} type='primary'>
				返回首页
			</Button>
		</div>
	)
}

export default Error
