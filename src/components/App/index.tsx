import React, { Suspense } from "react"
import { BrowserRouter, HashRouter as Router } from "react-router-dom"
import { ConfigProvider, Spin } from "antd"
import RenderRoutes from "@/components/RenderRoutes"
import routes from "@/routes"
import zhCN from "antd/lib/locale/zh_CN"
import moment from "moment"
import "moment/locale/zh-cn"
moment.locale("zh-cn")
function App(props: any) {
	return (
		<Router>
			<Suspense
				fallback={
					<div className='flex justify-center items-center pt-24 w-full h-64'>
						<Spin size='large' />
					</div>
				}
			>
				<ConfigProvider locale={zhCN}>
					<RenderRoutes routes={routes} />
				</ConfigProvider>
			</Suspense>
		</Router>
	)
}

export default App
