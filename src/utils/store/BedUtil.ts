import LocalStore from "../data/LocalStore"
import store from "@/store"
import { actions } from "@/store/reducers/user"

export interface BedListItem {
	label: string
	value: string
}

// 已选床位 存放到redux store
const BED_LIST = "BED_LIST"
class BedListUtil {
	// 获取 token
	static getBedList(): Array<BedListItem> {
		return LocalStore.get(BED_LIST) ?? []
	}

	// 设置床位列表
	static setBedList(val: any) {
		LocalStore.set(BED_LIST, val)
	}

	// 清除床位列表
	static clearBedList() {
		store.dispatch(actions.logout()) // 清除 床位列表
		LocalStore.remove(BED_LIST)
	}
}

export default BedListUtil
