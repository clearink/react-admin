import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./components/App"
import store from "./store"
import "@/styles/index.scss"
import app from "./configs/app"
if (app.ISDEV) {
	require("@/styles/tailwind.output.css")
} else {
	require("@/styles/tailwind.css")
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
)
