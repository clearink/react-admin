import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./components/App"
import store from "./store"
import "@/styles/index.scss"
import "@/styles/tailwind.output.css"

// import "@/styles/tailwind.css"
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
)

/**
 * 
 configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
 */
function Type(type: string): PropertyDecorator {
	return (target, propertyKey) => {
		console.log(target[propertyKey], propertyKey)
		const a = Reflect.defineProperty(target, propertyKey, {
			value: type,
			configurable: true,
			enumerable: false,
			writable: true,
		})
		console.log(target[propertyKey]);
	}
}
