// big sight avatar 组件
import React, { memo, useCallback, useMemo } from "react"
import { ProFormAvatar } from "../Pro/ProForm"
import { AvatarServerData, ProFormBsAvatarProps } from "./interface"
import { headers, actions } from "@/http/utils/file"

// TODO:  将 actions 与 headers 的 获取都放到某一个专门的文件里
function ProFormBsAvatar(props: ProFormBsAvatarProps) {
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
		/>
	)
}
export default memo(ProFormBsAvatar)
