// big sight avatar 组件
import React, { memo, useCallback } from "react"
import { ProFormAvatar } from "../Pro/ProForm"
import { ProFormAvatarProps } from "../Pro/ProForm/components/ProFormAvatar"
import app from "@/configs/app"
import LoginUtil from "@/utils/LoginUtil"
import { BaseProFormProps } from "../Pro/hocs/withFormItem"
import { CommonServerData } from "./interface"

export type ProFormBsAvatarProps = ProFormAvatarProps & BaseProFormProps

export type AvatarServerData = CommonServerData<{ url: string }>

// TODO:  将 actions 与 headers 的 获取都放到某一个专门的文件里
function ProFormBsAvatar(props: ProFormBsAvatarProps) {
	// 使用 函数是为了 总是获取最新的token
	const actions = useCallback(() => {
		return `${app.BASE_URL}${app.UPLOAD_URL}?path=org-avatar`
	}, [])
	const headers = useCallback(() => {
		return {
			[app.TOKEN]: LoginUtil.getToken(),
		}
	}, [])

	const handleTransformServerData = useCallback(
		(response: AvatarServerData) => response.result?.url ?? "error",
		[]
	)
	return (
		<ProFormAvatar
			{...props}
			action={actions()}
			transform={handleTransformServerData}
			headers={headers()}
		/>
	)
}
export default memo(ProFormBsAvatar)
