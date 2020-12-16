import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { CommonHeader } from "@/components/PepLife"
import { UserOutlined } from "@ant-design/icons"

function BedAllot() {
	return (
		<div className={styles.page_wrap}>
			 楼层分布
		</div>
	)
}
export default memo(BedAllot)
