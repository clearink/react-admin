import React from "react"
import { Card } from "antd"
import styles from "./style.module.scss"
import useMemoFetch from "@/hooks/useMemoFetch"

// 血糖
export default function BloodSugar() {
	return (
		<div className={styles.blood_oxy_page_wrap}>
			<Card title={<div className={styles.header}>历史记录</div>}></Card>
		</div>
	)
}
