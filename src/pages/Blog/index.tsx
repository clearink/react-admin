import { IBaseProps } from "@/@types/fc"
import React, { useEffect } from "react"
import SlateEditor from "@/components/SlateEditor"
import styles from "./style.module.scss"

function Blog(props: IBaseProps) {
	useEffect(() => {
		// 模拟请求数据
	}, [])
	return (
		<div className={styles.container}>
			<SlateEditor />
		</div>
	)
}

export default Blog
