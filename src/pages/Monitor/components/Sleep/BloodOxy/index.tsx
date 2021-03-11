import React from "react"
import { Card } from "antd"
import styles from "./style.module.scss"
import useMemoFetch from "@/hooks/useMemoFetch"

// 血氧
export default function BloodOxy() {
	return (
		<div className={styles.blood_oxy_page_wrap}>
			<div className={styles.card_wrap}>
				<Card title={<div className={styles.header}>历史记录</div>}></Card>
			</div>
		</div>
	)
}
