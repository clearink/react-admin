// 上传文件相关

import app from "@/configs/app"
import LoginUtil from "@/utils/LoginUtil"

// 使用函数是为了随时获得最新的token
export const actions = (path: string = "org") =>
	`${app.BASE_URL}${app.UPLOAD_URL}?path=${path}`
export const headers = { [app.TOKEN]: LoginUtil.getToken() }
