import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import rootReducer from "./reducers"

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
	: compose

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(logger, thunk))
)

export default store
