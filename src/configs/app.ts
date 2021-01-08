const isDev = process.env.NODE_ENV === "development"
export default {
	// BASE_URL: "http://localhost:5050",
	BASE_URL: isDev
		? "http://192.168.199.186:10010"
		: "http://app.peplife.net/backend",
	// BASE_URL: "http://192.168.199.186:10010",
	TIMEOUT: 20000,
	RETRY_DELAY: 3000,
	RETRY_COUNT: 4,
	// TOKEN: "ACCESS_TOKEN",
	TOKEN: "X-Access-Token",
	ISDEV: isDev,
	/** 文件上传 url */
	UPLOAD_URL: "/upload/file/cos",
}
