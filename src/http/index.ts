// Axios 二次封装
import Axios, {
	AxiosStatic,
	AxiosRequestConfig,
	AxiosError,
	AxiosResponse,
} from "axios"
import LocalStore from "@/utils/LocalStore"
import actions from "@/stores/actions"
import { message } from "antd"
import { BASE_URL, RETRY_DELAY, RETRY_COUNT, TOKEN } from "@/configs/app"
import LoginUtil from "@/utils/LoginUtil"

// type Method = "get" | "post" | "delete" | "head" | "put" | "options" | "patch"

class Http {
	private axios: AxiosStatic = Axios
	private timer: number = NaN

	private retryDelay: number = RETRY_DELAY
	private retryCount: number = RETRY_COUNT

	constructor() {
		const { axios } = this
		this.defaultConfig(axios)

		// 拦截器
		this.requestIntercept(axios)
		this.responseIntercept(axios)
	}

	private defaultConfig(axios: AxiosStatic) {
		axios.defaults.timeout = 10000
		axios.defaults.baseURL = BASE_URL
		axios.defaults.headers = {
			"Content-Type": "application/json;charset=utf-8",
		}
	}

	// 请求拦截器
	private requestIntercept(axios: AxiosStatic) {
		axios.interceptors.request.use(
			async (config: AxiosRequestConfig) => {
				const token = LocalStore.get(TOKEN)
				if (token) config.headers.authToken = token
				actions.LoadStart()
				return config
			},
			(error) => {
				actions.LoadEnd()
				return Promise.reject(error)
			}
		)
	}

	// 响应拦截器
	private responseIntercept(axios: AxiosStatic) {
		axios.interceptors.response.use(
			async (response: AxiosResponse) => {
				/**
				 * 处理各种错误码逻辑
				 */
				const {
					status,
					data: { code },
				} = response
				actions.LoadEnd()
				console.log("响应拦截器", response)
				if (status === 200 && code === 200) {
					return response
				}
				if (code === 10001) {
					// token 过期
					LoginUtil.clearToken()
				}
				this.showError(response.data)
				return Promise.reject(response)
			},
			// 多半是服务器问题
			(error: AxiosError) => {
				// 为了更好的提示动画
				this.showError(error)
				actions.LoadEnd()
				return Promise.reject(error)
			}
		)
	}

	// antd message 更流畅
	private showError(data: any) {
		window.clearTimeout(this.timer)
		this.timer = window.setTimeout(() => {
			message.error({
				key: data?.message,
				content: data?.message,
			})
		}, 300)
	}
	// get请求会被缓存,添加一个随机字符串确保得到最新的结果
	public get(url: string, params?: Object) {
		return this.axios.get(url, { params: { ...params, _t: Date.now() } })
	}

	// post
	public post(url: string, data: Object, options?: AxiosRequestConfig) {
		return this.axios.post(url, data, options)
	}

	// put
	public put(url: string, data: Object, options?: AxiosRequestConfig) {
		return this.axios.put(url, data, options)
	}

	// delete
	public delete(url: string, options?: AxiosRequestConfig) {
		return this.axios.delete(url, options)
	}
}

export default new Http()
