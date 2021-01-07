export interface CommonServerData<T = any> {
	code: number
	message: string
	result?: T
	success: boolean
}
