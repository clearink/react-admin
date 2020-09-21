import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import RenderRoutes from "@/components/RenderRoutes"
import routes from "@/routes"
import "@/styles/index.scss"
import "@/styles/tailwind.css"

function App(props: any) {
	console.log("App 组件是全局入口")
	return (
		<Router>
			<RenderRoutes routes={routes} />
		</Router>
	)
}

export default App