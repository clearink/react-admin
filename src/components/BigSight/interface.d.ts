import { ProFormTreeSelectProps } from "./../Pro/ProForm/components/ProFormTreeSelect/index"
import { BaseProFormProps } from "./../Pro/hocs/withFormItem"
import { FormItemProps } from "antd/lib/form"
import { ProFormAvatarProps } from "../Pro/ProForm/components/ProFormAvatar"

export interface CommonServerData<T = any> {
	code: number
	message: string
	result?: T
	success: boolean
}
export type BSFormItemProps<T> = Omit<T, keyof FormItemProps> & BaseProFormProps
export type AvatarServerData = CommonServerData<{ url: string }>
