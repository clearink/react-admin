import { combineReducers } from "@reduxjs/toolkit"
import counter from "./counter"
import user from "./user"
import menu from "./menu"
const rootReducer = combineReducers({ counter, user, menu })

export default rootReducer
