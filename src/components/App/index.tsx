import React from "react"
import { BrowserRouter, HashRouter as Router } from "react-router-dom"
import { ConfigProvider } from "antd"
import RenderRoutes from "@/components/RenderRoutes"
import routes from "@/routes"
import zhCN from "antd/lib/locale/zh_CN"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
dayjs.locale("zh-cn")

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
