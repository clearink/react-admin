export interface CommonServerData<T = any> {
	code: number
	message: string
	result?: T
	success: boolean
}

export type ProFormBsAvatarProps = ProFormAvatarProps & BaseProFormProps

export type AvatarServerData = CommonServerData<{ url: string }>
