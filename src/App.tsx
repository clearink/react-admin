import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import routes, { renderRoutes } from "@/routes"
import Home from "@/pages/Home"
function App() {
	return (
		<Router>
			{renderRoutes(routes)}
			<Route path="/">
				<Home />
			</Route>
		</Router>
	)
}

export default App
