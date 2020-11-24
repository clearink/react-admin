import React, { memo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { FilePicker, Icon } from "zarm"
import styles from "./style.module.scss"

function WrappedFilePicker(props: any) {
	console.log("WrappedFilePicker", props)
	return (
		<FilePicker {...props} className={styles.icon_wrap}>
			<Icon type='add' size='lg' />
		</FilePicker>
	)
}

export default memo(withDefaultProps(WrappedFilePicker, {}))
