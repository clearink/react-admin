import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import RenderRoutes from "@/components/RenderRoutes"
import routes from "@/routes"

function App(props: any) {
	return (
		<Router>
			<RenderRoutes routes={routes} />
		</Router>
	)
}

export default App
