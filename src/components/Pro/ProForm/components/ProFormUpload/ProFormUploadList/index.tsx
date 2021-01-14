import React, { useCallback, useMemo } from "react"
import { message, Upload } from "antd"
import { RcFile, UploadProps } from "antd/lib/upload"
import { PlusOutlined } from "@ant-design/icons"
import withFormItem from "@/components/Pro/hocs/withFormItem"
import styles from "./style.module.scss"
import { ProFormUploadListProps } from "../interface"
import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import { limitFileSize } from "../utils"
import { UploadFile } from "antd/lib/upload/interface"
import { isArray } from "@/utils/data/validate"

// 该组件只用于 上传头像
function ProFormUploadList(props: ProFormUploadListProps) {
	const {
		render,
		value,
		onChange,
		transform,
		count,
		limit,
		beforeUpload,
		...rest
	} = props

	const fileList = useMemo<UploadFile[]>(() => {
		if (!value) return []
		return value.slice(-(count ?? Infinity)) as UploadFile[]
	}, [value, count])
	console.log("fileList", value)

	const handleRemoveFile = useCallback(
		(file: UploadFile, FL: UploadFile[]) =>
			FL.filter((item) => file.uid !== item.uid),
		[]
	)

	const handleUploadChange: UploadProps["onChange"] = (info) => {
		const { file, fileList: FL } = info

		let newFileList = [...FL]
		if (file.status === "done") {
			const result = transform?.(file.response) ?? file.response
			if (result === false) {
				// 返回值不对也要remove
				newFileList = handleRemoveFile(file, FL)
			} else if (isArray(value)) {
				message.success("上传成功")
				newFileList = FL.map((item) => {
					if (item.uid === file.uid) return { ...result, uid: item.uid }
					return item
				})
			}
		}
		if (file.status === "error") {
			newFileList = handleRemoveFile(file, FL)
		}
		// 只有上传才会更新
		if (file.status) {
			console.log("fileList", newFileList)
			onChange?.(newFileList.slice(-(count ?? Infinity)))
		}else{
			console.log('被阻断',file);
			onChange?.(newFileList.filter(item=>item.uid !== file.uid))
		}
	}
	const handleBeforeUpload = useMemoCallback(
		(file: RcFile, fileList: RcFile[]) => {
			const result = beforeUpload?.(file, fileList) ?? true
			return result && fileList.every((item) => limitFileSize(item, limit))
		},
		[]
	)
	// 根据条件渲染不同的uploadButton
	const uploadButton = useMemo(() => {
		if (value && value.length >= (count ?? Infinity)) return null
		return (
			<div className={styles.upload_wrapper}>
				<PlusOutlined className={styles.icon} />
				<span className={styles.text}>上传</span>
			</div>
		)
	}, [value, count])

	const DOM = (
		<Upload
			{...rest}
			fileList={fileList}
			beforeUpload={handleBeforeUpload}
			onChange={handleUploadChange}
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
