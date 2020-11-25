import React, { memo } from "react"
import { Keyboard } from "zarm"
import styles from "./style.module.scss"

interface IProps {
	imgList: string[]
	autoPlay: boolean
	[key: string]: any
}

// 必须让跑马灯组件在每次数据更改后重新渲染
function WrappedKeyboard(props: IProps) {
	return (
		<div className={styles.keyboard}>
			<Keyboard {...props} />
		</div>
	)
}

export default memo(WrappedKeyboard)
