import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import useMethods from "@/components/Pro/hooks/methods/useMethods"
import GetServiceContext from "@/utils/store/GetServiceContext"
import { RcFile, UploadProps } from "antd/lib/upload"
import { useEffect, useState } from "react"
import { ProFormAvatarProps } from "../interface"
import { limitFileSize, limitUploadImg } from "../utils"

export const UploadAvatarServiceContext = GetServiceContext(
	useUploadAvatarService
)

const initialState = {
	src: null as null | string, // 图片链接
	loading: false, // 上传 loading
	error: false, // 是否出错
}
const reducers = {
	start(state: any) {
		return { ...state, loading: true, error: false }
	},
	success(state: any, src: string) {
		return { ...initialState, src }
	},
	error(state: any) {
		return { ...state, error: true }
	},
	setError(state: any, error: boolean) {
		return { ...state, error }
	},
}
export default function useUploadAvatarService(props: ProFormAvatarProps) {
	const { onChange, transform, value, beforeUpload, limit } = props
	const [state, methods] = useMethods(reducers, { ...initialState, src: value })

	// 与外部保持一致 可选
	const handleChange = useMemoCallback((file: any) => onChange?.(file), [])
	useEffect(() => {
		handleChange(state.src)
	}, [handleChange, state.src])

	// 处理 头像src 与 loading
	const handleUploadChange: UploadProps["onChange"] = (info) => {
		const { file } = info
		if (file.status === "uploading") {
			onChange?.(file)
			methods.start()
		}

		if (file.status === "done") {
			const result = transform?.(file.response) ?? file.response

			if (result) methods.success(result)
			else methods.error()
		}
		// 上传失败并不会清除 src
		if (file.status === "error") methods.error()
	}

	const handleBeforeUpload = useMemoCallback(
		(file: RcFile, fileList: RcFile[]) => {
			const result = beforeUpload?.(file, fileList) ?? true
			return limitFileSize(file, limit) && limitUploadImg(file) && result
		},
		[]
	)
	return {
		state,
		methods,
		handleUploadChange,
		handleBeforeUpload,
	}
}
