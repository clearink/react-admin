import { BaseProFieldProps } from "@/components/Pro/ProField/type"
import { UploadFile } from "antd/lib/upload/interface"
import { UploadProps } from "antd/lib/upload"

export type UploadListValue = Array<{ uid: string; url: string }>
export interface ProFormUploadListProps extends Omit<UploadProps, "onChange"> {
	render?: BaseProFieldProps<ProFormUploadListProps>["render"]
	/** 转换上传后的数据 返回false 会删除该数据 考虑上传时可能提示未登录 */
	transform?: (response: any) => { url: string } | false
	value?: UploadListValue

	/** 文件数量限制 */
	count?: number
	/** 文件大小限制 KB */
	limit?: number
	/** true 代表上传中 */
	onChange?: (file: Array<UploadFile>) => void
}
