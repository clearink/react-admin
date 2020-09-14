import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "./store"
import App from "@/app"

const render = () => {
	const App = require("./app").default

	ReactDOM.render(
		// <React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>,
		// </React.StrictMode>
		document.getElementById("root")
	)
}
render()
if (process.env.NODE_ENV === "development" && (module as any).hot) {
	;(module as any).hot.accept("./app", render)
}
