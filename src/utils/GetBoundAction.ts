import store, { AppDispatch } from "@/store"
import { bindActionCreators } from "redux"
import {} from "@reduxjs/toolkit"

function GetBoundAction<T>(actionCreators: any): any {
	return bindActionCreators(actionCreators, store.dispatch as AppDispatch)
}
export default GetBoundAction
