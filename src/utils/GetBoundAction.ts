import store, { AppDispatch } from "@/store"
import { bindActionCreators } from "redux"
const dispatch = store.dispatch

function GetBoundAction(actionCreators: any) {
	return bindActionCreators(actionCreators, dispatch as AppDispatch)
}
export default GetBoundAction
