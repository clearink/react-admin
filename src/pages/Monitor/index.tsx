import React from "react"
import { Empty, Spin } from "antd"
import styles from "./style.module.scss"
import BedCard from "./components/BedCard"
import BCGDetail from "./components/BCGDetail"
import useMonitorService, {
	BedItem,
	MonitorServiceContext,
} from "./useMonitor.service"
import BCGFilter from "./components/BCGFilter"

// 监控分析
function Monitor() {
	const services = useMonitorService()
	const renderData = (() => {
		if (services.fetchBedLoading)
			return (
				<div className='flex h-64 items-center justify-center w-full'>
					<Spin size='large' />
				</div>
			)
		if (!services.bedList || services.bedList.length === 0)
			return (
				<div className='flex h-64 items-center justify-center w-full'>
					<Empty />
				</div>
			)
		return services.bedList?.map((item: BedItem) => (
			<BedCard item={item} key={item!.id} />
		))
	})()

	const renderPlaceholder = (() => {
		return Array.from({ length: 7 }, (_, i) => (
			<div key={i} className={styles.bed_card_placeholder}></div>
		))
	})()
	return (
		<MonitorServiceContext.Provider value={services}>
			<main>
				<BCGFilter />
				<div className={styles.bed_card_list}>
					{renderData}
					{renderPlaceholder}
				</div>
				<BCGDetail />
			</main>
		</MonitorServiceContext.Provider>
	)
}

export default Monitor
