// big sight upload list 组件
import React, { memo, useCallback, useMemo, useRef, useState } from "react"
import { ProFormUploadList } from "../../Pro/ProForm"
import { AvatarServerData, BSFormItemProps } from "../interface"
import { headers, actions } from "@/http/api/utils/file"
import { ProFormUploadListProps } from "@/components/Pro/ProForm/components/ProFormUpload/interface"
import { UploadFile } from "antd/lib/upload/interface"
import { isArray, isString } from "@/utils/data/validate"
import { Rule } from "antd/lib/form"
import { Image } from "antd"
import ModalTrigger, { ModalTriggerRef } from "@/components/ModalTrigger"

// TODO:  将 actions 与 headers 的 获取都放到某一个专门的文件里
export interface BSUploadListProps
	extends BSFormItemProps<Omit<ProFormUploadListProps, "value">> {
	value?: string | ProFormUploadListProps["value"] | Array<string>
}
function BSAvatar(props: BSUploadListProps) {
	const { initialValue, value, rules, ...rest } = props
	const modalRef = useRef<ModalTriggerRef>(null)
	const [preview, setPreview] = useState<string | undefined>(undefined)
	const uploadUrl = useMemo(() => actions("org-file"), [])

	// 转换从服务器得到的数据
	const handleTransformServerData = useCallback(
		(response: AvatarServerData) => {
			if (response.result) return { url: response.result.url }
			// 如果服务器返回未登录
			return false
		},
		[]
	)
	const fileList = useMemo(() => {
		// TODO可能将来还会在前面加上 oss_url
		if (!initialValue) return []
		if (!isArray(initialValue))
			return initialValue.split(",").map((item: any) => {
				if (isString(item)) return { uid: item, url: item }
				return item
			})
		return initialValue.map((item) => {
			if (isString(item)) return { uid: item, url: item }
			return item
		})
	}, [initialValue])
	const formRules = useMemo(() => {
		const loadingRule: Rule = {
			validator: (_, list: UploadFile[]) => {
				if (list && list.some((item) => item.originFileObj))
					return Promise.reject("文件上传中")
				return Promise.resolve()
			},
		}
		if (rules) return rules.concat(loadingRule)
		return [loadingRule]
	}, [rules])

	// 对于每个公司的不同preview 方式
	const handlePreview = (file: UploadFile<any>) => {
		modalRef.current?.toggle()
		setPreview(file.url)
	}
	return (
		<>
			<ProFormUploadList
				{...rest}
				onPreview={handlePreview}
				initialValue={fileList}
				action={uploadUrl}
				headers={headers()}
				transform={handleTransformServerData}
				limit={2048}
				rules={formRules}
				// 上传中请等待
			/>
			<ModalTrigger ref={modalRef} footer={null} closable={false}>
				<img src={preview} alt='preview' />
			</ModalTrigger>
		</>
	)
}
export default memo(BSAvatar)
