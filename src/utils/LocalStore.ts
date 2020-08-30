/**
 * 本地存储封装
 */
const store = window.localStorage

class LocalStore {
	static set(key: string, value: any) {
		try {
			store.setItem(key, JSON.stringify(value))
		} catch (err) {
			store.setItem(key, value)
		}
	}
	
	static get(key: string) {
		const result = store.getItem(key)
		try {
			return JSON.parse(result as string)
		} catch (err) {
			return result
		}
	}

	static remove(key: string) {
		store.removeItem(key)
	}

	static clear() {
		store.clear()
	}
}

export default LocalStore
