import React from "react"
import { HashRouter as Router } from "react-router-dom"
import RenderRoutes from "@/components/RenderRoutes"
import routes from "@/routes"
import "@/styles/main.scss"

function App() {
	console.log("App 组件是全局入口")
	return (
		<Router>
			<RenderRoutes routes={routes} />
		</Router>
	)
}

export default App
