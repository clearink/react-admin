import React, { createContext, useState } from "react"
import styles from "./style.module.scss"
import { Radio, Space } from "antd"
import BedCard from "./components/BedCard"
import BCGDetail from "./components/BCGDetail"
import useBoolean from "@/hooks/useBoolean"

interface BCGContextProps {
	visible: boolean
	toggle: () => void
	setBcgId?: React.Dispatch<React.SetStateAction<any>>
}
export const BCGContext = createContext<BCGContextProps>({
	visible: false,
	toggle: () => {},
})
// 监控分析
function Monitor() {
	const [bcgId, setBcgId] = useState(undefined)
	const [visible, toggle] = useBoolean()

	return (
		<main>
			{/* 楼层 */}
			<div className={styles.filter_bar}>
				<div className={styles.filter_item}>
					<div className={styles.filter_title}>楼层</div>
					<Radio.Group optionType='button' buttonStyle='solid' value={3}>
						<Space size={14} className={styles.value_list}>
							{Array.from({ length: 6 }, (_, i) => (
								<Radio.Button value={i} className={styles.list_item} key={i}>
									{i}楼
								</Radio.Button>
							))}
						</Space>
					</Radio.Group>
				</div>
				<div className={styles.filter_item}>
					<div className={styles.filter_title}>房间</div>
					<Radio.Group optionType='button' buttonStyle='solid' value={3}>
						<Space size={14} className={styles.value_list}>
							{Array.from({ length: 36 }, (_, i) => (
								<Radio.Button value={i} className={styles.list_item} key={i}>
									{i + 500}
								</Radio.Button>
							))}
						</Space>
					</Radio.Group>
				</div>
				<div className={styles.filter_item}>
					<div className={styles.filter_title}>状态</div>
					<Radio.Group optionType='button' buttonStyle='solid' value={3}>
						<Space size={14} className={styles.value_list}>
							{Array.from({ length: 6 }, (_, i) => (
								<Radio.Button value={i} className={styles.list_item} key={i}>
									{i + 500}
								</Radio.Button>
							))}
						</Space>
					</Radio.Group>
				</div>
			</div>
			{/* 病床 */}
			<BCGContext.Provider value={{ visible, toggle, setBcgId }}>
				<div className={styles.bed_card_list}>
					{Array.from({ length: 30 }, (_, i) => (
						<BedCard title='507房 - 01床' key={i} />
					))}
					{Array.from({ length: 6 }, (_, i) => (
						<div className={styles.bed_card_placeholder} key={i} />
					))}
				</div>
				<BCGDetail id={bcgId} />
			</BCGContext.Provider>
		</main>
	)
}

export default Monitor
