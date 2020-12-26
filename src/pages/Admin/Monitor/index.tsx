import React, { createContext, useEffect, useRef, useState } from "react"
import styles from "./style.module.scss"
import { Radio } from "antd"
import BedCard from "./components/BedCard"
import BCGDetail from "./components/BCGDetail"
import useBoolean from "@/hooks/useBoolean"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import { ProFormRadio } from "@/components/Pro/ProForm"
import { FormInstance } from "antd/lib/form"

interface BCGContextProps {
	visible: boolean
	toggle: () => void
	setBcgId?: React.Dispatch<React.SetStateAction<any>>
}
export const BCGContext = createContext<BCGContextProps>({
	visible: false,
	toggle: () => {},
})

const roomData = [
	{
		title: "一楼",
		id: 1,
		children: Array.from({ length: 10 }, (_, i) => ({
			id: 100 + i,
			title: `${100 + i}`,
		})),
	},
	{
		title: "二楼",
		id: 2,
		children: Array.from({ length: 10 }, (_, i) => ({
			id: 200 + i,
			title: `${200 + i}`,
		})),
	},
	{
		title: "三楼",
		id: 3,
		children: Array.from({ length: 10 }, (_, i) => ({
			id: 300 + i,
			title: `${300 + i}`,
		})),
	},
	{
		title: "四楼",
		id: 4,
		children: Array.from({ length: 10 }, (_, i) => ({
			id: 400 + i,
			title: `${400 + i}`,
		})),
	},
	{
		title: "五楼",
		id: 5,
		children: Array.from({ length: 10 }, (_, i) => ({
			id: 500 + i,
			title: `${500 + i}`,
		})),
	},
]
const statusData = ["全部(30)", "在床(27)", "离床(2)", "离线(1)"]
// 监控分析
function Monitor() {
	const [bcgId, setBcgId] = useState(undefined)
	const [visible, toggle] = useBoolean()
	const formRef = useRef<FormInstance>()
	const [selectRoomData, setSelectRoomData] = useState<any[]>([])

	useEffect(() => {
		const floor = formRef.current?.getFieldValue("floor")
		if (!floor) return
		const SF = roomData.find((item) => item.id === floor)
		if (SF)
			setSelectRoomData(
				SF.children.map((item) => ({ label: item.title, value: item.id })) ?? []
			)
	}, [])
	return (
		<main>
			{/* 楼层 */}
			<div className={styles.filter_bar}>
				<BaseForm
					ref={formRef}
					submitConfig={{ render: () => <></> }}
					className='px-4'
				>
					<div className={styles.filter_item}>
						<ProFormRadio
							label='楼层'
							name='floor'
							initialValue={1}
							onChange={(e) => {
								const floor = formRef.current?.getFieldValue("floor")
								if (!floor) return
								const SF = roomData.find((item) => item.id === floor)
								if (SF)
									setSelectRoomData(
										SF.children.map((item) => ({
											label: item.title,
											value: item.id,
										})) ?? []
									)
							}}
							options={roomData.map((item) => ({
								label: item.title,
								value: item.id,
							}))}
							renderFormItem={(value, props) => {
								const { options, ...rest } = props as any
								return (
									<Radio.Group {...rest} buttonStyle='solid'>
										{options.map((item: any) => {
											return (
												<Radio.Button
													key={item.value}
													value={item.value}
													className='mr-4 px-6 mb-4'
												>
													{item.label}
												</Radio.Button>
											)
										})}
									</Radio.Group>
								)
							}}
						/>
						{/* <Radio.Group optionType='button' buttonStyle='solid' value={3}>
							<Space size={14} className={styles.value_list}>
								{Array.from({ length: 6 }, (_, i) => (
									<Radio.Button value={i} className={styles.list_item} key={i}>
										{i}楼
									</Radio.Button>
								))}
							</Space>
						</Radio.Group> */}
					</div>
					<div className={styles.filter_item}>
						{/* <div className={styles.filter_title}>房间</div>
						<Radio.Group optionType='button' buttonStyle='solid' value={3}>
							<Space size={14} className={styles.value_list}>
								{Array.from({ length: 36 }, (_, i) => (
									<Radio.Button value={i} className={styles.list_item} key={i}>
										{i + 500}
									</Radio.Button>
								))}
							</Space>
						</Radio.Group> */}
						<ProFormRadio
							label='房间'
							name='room'
							options={selectRoomData}
							renderFormItem={(value, props) => {
								const { options, ...rest } = props as any
								return (
									<Radio.Group {...rest} buttonStyle='solid'>
										{options.map((item: any) => {
											return (
												<Radio.Button
													key={item.value}
													value={item.value}
													className='mr-4 px-6 mb-4'
												>
													{item.label}
												</Radio.Button>
											)
										})}
									</Radio.Group>
								)
							}}
						/>
					</div>
					<div className={styles.filter_item}>
						<ProFormRadio
							name='status'
							label='状态'
							options={statusData}
							renderFormItem={(value, props) => {
								const { options, ...rest } = props as any
								return (
									<Radio.Group {...rest} buttonStyle='solid'>
										{options.map((item: any) => {
											return (
												<Radio.Button
													key={item}
													value={item}
													className='mr-4 px-6 mb-4'
												>
													{item}
												</Radio.Button>
											)
										})}
									</Radio.Group>
								)
							}}
						/>
						{/* <div className={styles.filter_title}>状态</div>
						<Radio.Group optionType='button' buttonStyle='solid' value={3}>
							<Space size={14} className={styles.value_list}>
								{statusData.map((item) => (
									<Radio.Button
										value={item}
										className={styles.list_item}
										key={item}
									>
										{item}
									</Radio.Button>
								))}
							</Space>
						</Radio.Group>
									 */}
					</div>
				</BaseForm>
			</div>
			{/* 病床 */}
			<BCGContext.Provider value={{ visible, toggle, setBcgId }}>
				<div className={styles.bed_card_list}>
					{Array.from({ length: 30 }, (_, i) => (
						<BedCard
							title={`507房 - ${i.toString().padStart(2, "0")}床`}
							key={i}
						/>
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
