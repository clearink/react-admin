export interface CommonServerData<T = any> {
	code: number
	message: string
	result: T
	success: boolean
}
export interface FetchProps {
	/** 请求地址 地址为空不请求 */
	url?: string
	/**  请求参数 */
	params?: object
	/** 请求方式 */
	method?: "get" | "post" | "delete" | "put"
	/** 是否需要缓存 */
	cache?: boolean
	/** 自动请求一次 */
	auto?: boolean
	/** 转换数据 cache代表是否为store中的数据 */
	transform?: (response: CommonServerData, cache?: boolean) => any
}
