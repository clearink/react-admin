// big sight avatar 组件
import React, { memo, useCallback, useMemo } from "react"
import { ProFormAvatar } from "../Pro/ProForm"
import { AvatarServerData, BSFormItemProps } from "./interface"
import { headers, actions } from "@/http/api/utils/file"
import { ProFormAvatarProps } from "../Pro/ProForm/components/ProFormAvatar"

// TODO:  将 actions 与 headers 的 获取都放到某一个专门的文件里
function BSAvatar(props: BSFormItemProps<ProFormAvatarProps>) {
	const uploadUrl = useMemo(() => actions("org-avatar"), [])

	// 转换从服务器得到的数据
	const handleTransformServerData = useCallback(
		(response: AvatarServerData) => response.result?.url ?? "error",
		[]
	)
	return (
		<ProFormAvatar
			{...props}
			action={uploadUrl}
			transform={handleTransformServerData}
			headers={headers}
			// 上传中请等待
			rules={[
				{
					validator: (_, value) => {
						if (value?.status === "uploading")
							return Promise.reject("图片上传中")
						return Promise.resolve()
					},
				},
			]}
		/>
	)
}
export default memo(BSAvatar)
