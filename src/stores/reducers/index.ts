import { combineReducers } from "redux"
import counter from "./counter"
import loading from "./loading"
import user from "./user"
const rootReducer = combineReducers({ counter, loading, user })

export default rootReducer
