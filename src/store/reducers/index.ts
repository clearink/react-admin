import { combineReducers } from "@reduxjs/toolkit"
import counter from "./counter"
import user from "./user"
import menu from "./menu"
import list from "./list"
const rootReducer = combineReducers({ counter, user, menu, list })

export default rootReducer
