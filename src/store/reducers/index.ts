import { combineReducers } from "@reduxjs/toolkit"
import counter from "./counter"
import user from "./user"
import menu from "./menu"
import list from "./list"
import test from "./test"
import type from "./type"
import builder from "./builder"
const rootReducer = combineReducers({
	counter,
	user,
	menu,
	list,
	test,
	type,
	builder,
})

export default rootReducer
