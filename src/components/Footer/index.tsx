import { CopyrightOutlined } from "@ant-design/icons"
import React from "react"
import "./style.scss"
// 基础页脚
function Footer() {
	return (
		<footer className='app-login-footer'>
			<p>
				<CopyrightOutlined /> 
				2020 PEPPER LIFE TECHNOLOGY. All rights reserved.
			</p>
		</footer>
	)
}

export default Footer
