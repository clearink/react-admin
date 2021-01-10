import { message } from "antd"
import { RcFile } from "antd/lib/upload"

/**
 *
 * @param file 文件对象
 * @param limit 大小 kb为单位
 */
// 只能上传图片
export function limitUploadImg(file: RcFile) {
	const isImg = /^image/g.test(file.type)
	if (!isImg) message.error("只能上传图片")
	return isImg
}
export function limitFileSize(file: RcFile, limit?: number) {
	const limitSize = limit ?? Infinity
	const isLtLimit = file.size / 1024 < limitSize
	if (!isLtLimit) {
		message.error("文件太大")
	}
	return isLtLimit
}
