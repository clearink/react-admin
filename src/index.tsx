import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./components/App"
import store from "./store"
import "@/styles/index.scss"
if (process.env.NODE_ENV === "production") {
	require("@/styles/tailwind.css")
} else {
	require("@/styles/tailwind.output.css")
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
)
