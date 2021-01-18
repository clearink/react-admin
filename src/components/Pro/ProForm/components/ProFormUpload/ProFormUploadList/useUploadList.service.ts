import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import { isArray } from "@/utils/data/validate"
import GetServiceContext from "@/utils/store/GetServiceContext"
import { message } from "antd"
import { RcFile, UploadFile, UploadProps } from "antd/lib/upload/interface"
import { useCallback, useEffect, useState } from "react"
import { ProFormUploadListProps } from "../interface"
import { limitFileSize } from "../utils"

export const UploadListServiceContext = GetServiceContext(useUploadListService)
// 上传列表组件 服务
export default function useUploadListService(props: ProFormUploadListProps) {
	const { value, count, onChange, transform, beforeUpload, limit } = props
	// 1. 自行维护的 fileList
	const [list, setList] = useState<UploadFile[]>(() => {
		// 初始值
		if (!value) return []
		return value.slice(-count!) as UploadFile[]
	})

	// 与外部保持一致
	const handleOnChange = useMemoCallback(onChange!, [])
	useEffect(() => {
		handleOnChange(list)
	}, [list, handleOnChange])

	// 删除文件
	const handleRemoveFile = useCallback(
		(file: UploadFile, FL: UploadFile[]) =>
			FL.filter((item) => file.uid !== item.uid),
		[]
	)

	// list 变更时
	const handleUploadChange: UploadProps["onChange"] = (info) => {
		const { file, fileList: FL } = info

		let newFileList = FL
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
		if (file.status) setList(newFileList.slice(-count!))
		else setList(newFileList.filter((item) => item.uid !== file.uid))
	}
	// 上传校验
	const handleBeforeUpload = useMemoCallback(
		(file: RcFile, fileList: RcFile[]) => {
			const result = beforeUpload?.(file, fileList) ?? true
			return result && fileList.every((item) => limitFileSize(item, limit))
		},
		[]
	)
	return {
		list,
		handleUploadChange,
		handleBeforeUpload,
	}
}
