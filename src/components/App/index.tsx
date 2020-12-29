import React  from "react"
import { BrowserRouter, HashRouter as Router } from "react-router-dom"
import { ConfigProvider } from "antd"
import RenderRoutes from "@/components/RenderRoutes"
import routes from "@/routes"
import zhCN from "antd/lib/locale/zh_CN"
import moment from "moment"
import "moment/locale/zh-cn"
moment.locale("zh-cn")
function App(props: any) {
	return (
		<Router>
			<ConfigProvider locale={zhCN}>
				<RenderRoutes routes={routes} />
			</ConfigProvider>
		</Router>
	)
}

export default App
