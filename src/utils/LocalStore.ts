/**
 * 本地存储封装
 */
const store = window.localStorage

class LocalStore {
	public static set(key: string, value: any) {
		try {
			store.setItem(key, JSON.stringify(value))
		} catch (err) {
			store.setItem(key, value)
		}
	}

	public static get(key: string) {
		const result = store.getItem(key)
		try {
			return JSON.parse(result as string)
		} catch (err) {
			if (result === "undefined") return
			return result
		}
	}

	public static remove(key: string) {
		store.removeItem(key)
	}

	public static clear() {
		store.clear()
	}
}

export default LocalStore
