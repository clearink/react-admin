import store from "@/store"
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from "redux"

function GetBoundAction<C>(actionCreator: C): C

function GetBoundAction<M extends ActionCreatorsMapObject<any>>(
	actionCreators: M
): M {
	return bindActionCreators(actionCreators, store.dispatch as Dispatch)
}
export default GetBoundAction
