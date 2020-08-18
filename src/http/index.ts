// Axios 二次封装
import Axios, { AxiosStatic, AxiosPromise, AxiosRequestConfig } from "axios"
import { message, notification } from "antd"
import store from "@/stores"
import LocalStore from "@/utils/LocalStore"

type Method = "get" | "post" | "delete" | "head" | "put" | "options" | "patch"

class Http {
	private axios: AxiosStatic = Axios

	private retryDelay: number = Number(process.env.REACT_APP_RETRY_DELAY) || 3000
	private retryCount: number = Number(process.env.REACT_APP_RETRY_COUNT) || 4

	constructor() {
		const { axios } = this
		this.defaultConfig(axios)

		// 拦截器
		this.requestIntercept(axios)
		this.responseIntercept(axios)
	}

	private defaultConfig(axios: AxiosStatic) {
		axios.defaults.timeout = 10000
		axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
		axios.defaults.headers = {
			"Content-Type": " application/json:charset=utf-8",
		}
	}
	// 请求拦截器
	private requestIntercept(axios: AxiosStatic) {
		axios.interceptors.request.use(
			async (config: AxiosRequestConfig) => {
				const token = LocalStore.get(process.env.REACT_APP_ACCESS_TOKEN || "")
				if (token) config.headers.authToken = token
				return config
			},
			async (err) => {
				return err
			}
		)
	}

	// 响应拦截器
	private responseIntercept(axios: AxiosStatic) {
		axios.interceptors.request.use(
			async (response) => {
				console.log(response)
				/**
				 * 处理各种错误码逻辑
				 */

				return response
			},
			async (err) => {
				// 多半是服务器问题

				return err
			}
		)
	}

	// get请求会被缓存,添加一个随机字符串确保得到最新的结果
	private get(url: string, params: Object) {
		return this.axios.get(url, { params: { ...params, _t: Date.now() } })
	}

	// post
	private post(url: string, data: Object, options: AxiosRequestConfig) {
		return this.axios.post(url, data, options)
	}

	// put
	private put(url: string, data: Object, options: AxiosRequestConfig) {
		return this.axios.put(url, data, options)
	}

	// delete
	private delete(url: string, options: AxiosRequestConfig) {
		return this.axios.delete(url, options)
	}
}

export default new Http()
