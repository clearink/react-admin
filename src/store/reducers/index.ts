import { combineReducers } from "@reduxjs/toolkit"
import counter from "./counter"
import user from "./user"
import menu from "./menu"
import list from "./list"
import test from "./test"
const rootReducer = combineReducers({ counter, user, menu, list, test })

export default rootReducer
