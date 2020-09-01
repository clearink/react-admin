import { combineReducers } from "redux"
import counter from "./counter"
import loading from "./loading"
import user from "./user"
import menu from "./menu"
const rootReducer = combineReducers({ counter, loading, user, menu })

export default rootReducer
