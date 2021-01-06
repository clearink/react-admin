import { combineReducers } from "@reduxjs/toolkit"
import counter from "./counter"
import user from "./user"
import menu from "./menu"
import test from "./test"
import kv from "./kv"
const rootReducer = combineReducers({
	counter,
	user,
	menu,
	test,
	kv,
})

export default rootReducer
