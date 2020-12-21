// 测试 utils
export const sleep = async (delay: number) => {
	return new Promise((res, rej) => {
		setTimeout(res, delay)
	})
}
