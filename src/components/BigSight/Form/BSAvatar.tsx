// big sight avatar 组件
import React, { memo, useCallback, useMemo } from "react"
import { ProFormAvatar } from "../../Pro/ProForm"
import { AvatarServerData, BSFormItemProps } from "../interface"
import { headers, actions } from "@/http/api/utils/file"
import { ProFormAvatarProps } from "@/components/Pro/ProForm/components/ProFormUpload/interface"
import { UploadFile } from "antd/lib/upload/interface"
import { Rule } from "antd/lib/form"

// TODO:  将 actions 与 headers 的 获取都放到某一个专门的文件里
export type BSAvatarProps = BSFormItemProps<ProFormAvatarProps>
function BSAvatar(props: BSAvatarProps) {
	const { initialValue, rules, ...rest } = props
	const uploadUrl = useMemo(() => actions("org-avatar"), [])

	// 转换从服务器得到的数据
	const handleTransformServerData = useCallback(
		(response: AvatarServerData) => {
			if (response.result) return response.result.url
			// 如果服务器返回未登录
			return false
		},
		[]
	)
	const fullImgUrl = useMemo(() => {
		// 可能将来还会在前面加上 ossUrl
		return initialValue
	}, [initialValue])
	const formRules = useMemo(() => {
		const loadingRule: Rule = {
			validator: (_, value: UploadFile) => {
				if (value?.originFileObj) return Promise.reject("图片上传中")
				return Promise.resolve()
			},
		}
		if (rules) return rules.concat(loadingRule)
		return [loadingRule]
	}, [rules])
	return (
		<ProFormAvatar
			{...rest}
			initialValue={fullImgUrl}
			action={uploadUrl}
			headers={headers}
			transform={handleTransformServerData}
			limit={2048}
			// 上传中请等待
			rules={formRules}
		/>
	)
}
export default memo(BSAvatar)
