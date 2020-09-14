import store from "@/store"
import { bindActionCreators, Dispatch } from "redux"
const dispatch = store?.dispatch

function BoundAction<A>(actionCreators: A): A
function BoundAction(actionCreators: any) {
	return bindActionCreators(actionCreators, dispatch as Dispatch<any>)
}
export default BoundAction
