import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Card, Typography } from "antd"

function BedAllot() {
	return (
		<div className={styles.page_wrap}>
			<Card title='楼层分布' className={styles.left}></Card>
			<div className={styles.right}></div>
		</div>
	)
}
export default memo(BedAllot)
