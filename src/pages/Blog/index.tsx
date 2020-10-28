import { IBaseProps } from "@/@types/fc"
import React, { useEffect } from "react"
import { List } from "antd"
import styles from "./style.module.scss"


function Blog(props: IBaseProps) {
	useEffect(() => {
		// 模拟请求数据
	}, [])
	return (
		<div className={styles.container}>
			<List dataSource={[]}>
				<div className='bg-red-400 h-screen'>1232112</div>
			</List>
		</div>
	)
}

export default Blog
