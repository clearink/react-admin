import React, { useMemo } from "react"
import { Upload } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import withFormItem from "@/components/Pro/hocs/withFormItem"
import styles from "./style.module.scss"
import { ProFormUploadListProps } from "../interface"
import useUploadListService from "./useUploadList.service"

// 该组件只用于 上传头像
function ProFormUploadList(props: ProFormUploadListProps) {
	const {
		value,
		count,
		onChange,
		transform,
		beforeUpload,
		limit,
		render,
		...rest
	} = props
	const uploadListService = useUploadListService(props)

	const len = uploadListService.list.length
	const uploadButton = useMemo(() => {
		if (len >= count!) return null
		return (
			<div className={styles.upload_wrapper}>
				<PlusOutlined className={styles.icon} />
				<span className={styles.text}>上传</span>
			</div>
		)
	}, [len, count])

	const DOM = (
		<Upload
			{...rest}
			fileList={uploadListService.list}
			beforeUpload={uploadListService.handleBeforeUpload}
			onChange={uploadListService.handleUploadChange}
		>
			{uploadButton}
		</Upload>
	)
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<ProFormUploadListProps>(ProFormUploadList, {
	value: [],
	count: Infinity,
	listType: "picture-card",
})
