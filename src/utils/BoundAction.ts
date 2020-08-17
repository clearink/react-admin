import store from "@/stores"
import { bindActionCreators, Dispatch } from "redux"
const dispatch = store.dispatch

export default function (actions: any) {
	return bindActionCreators(actions, dispatch as Dispatch)
}
