import { BaseProFormProps } from "./../Pro/hocs/withFormItem"
import { FormItemProps } from "antd/lib/form"

export interface CommonServerData<T = any> {
	code: number
	message: string
	result?: T
	success: boolean
}
export type BSFormItemProps<T> = Omit<T, keyof FormItemProps> & BaseProFormProps
export type AvatarServerData = CommonServerData<{ url: string }>
