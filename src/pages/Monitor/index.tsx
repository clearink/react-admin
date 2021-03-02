import React, {
	createContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import { Empty, Spin } from "antd"
import styles from "./style.module.scss"
import BedCard from "./components/BedCard"
import BCGDetail from "./components/BCGDetail"
import useBoolean from "@/hooks/useBoolean"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import { ProFormRadio } from "@/components/Pro/ProForm"
import { FormInstance } from "antd/lib/form"
import useMemoFetch from "@/hooks/useMemoFetch"
import { convertRoomTree } from "../BedAllot/utils"
import { ReloadOutlined } from "@ant-design/icons"
interface BCGContextProps {
	visible: boolean
	toggle: () => void
	setBedItem?: React.Dispatch<React.SetStateAction<BedItem>>
}
export const BCGContext = createContext<BCGContextProps>({
	visible: false,
	toggle: () => {},
})

export type BedItem = null | {
	id: string
	memberName: string
	sleepScore: number
	deviceStatus: string
	num: string
	alarmStatus: boolean
	deviceNum: string
}

const statusData = ["全部(30)", "在床(27)", "离床(2)", "离线(1)"]

// 监控分析
function Monitor() {
	const [bedItem, setBedItem] = useState<BedItem>(null)
	const [visible, toggle] = useBoolean()
	const formRef = useRef<FormInstance>()

	// 获取房间树列表
	const [{ data: buildingList }] = useMemoFetch({
		url: "/orgmgt/room/tree",
		method: "post",
		cache: true,
		transform: (response, cache) => {
			if (cache) return response
			return convertRoomTree(response.result, "childList") ?? []
		},
	})

	const [buildingId, setBuildingId] = useState<string | undefined>() // 楼栋ID
	const [floorId, setFloorId] = useState<string | undefined>() // 楼层ID
	const [roomId, setRoomId] = useState<string | undefined>() // 房间ID
	const [{ data: list, loading }, fetchData] = useMemoFetch({
		url: roomId ? "/orgmgt/bed/monitor" : undefined,
		method: "post",
		params: { roomId: roomId!, status: undefined, pageNo: 1, pageSize: 100 },
		transform: (data) => {
			return data.result.records
		},
	})

	// 楼层数据
	const buildingData = useMemo(() => {
		if (!buildingList) return undefined
		return buildingList.map((item: any) => ({
			label: item.title,
			value: item.value,
			children: item.children,
		}))
	}, [buildingList])
	// 楼层数据
	const floorData = useMemo(() => {
		if (!buildingId || !buildingList) return undefined
		const data = buildingList.find((item: any) => item.value === buildingId)
		if (!data) return undefined
		return data.children?.map((item: any) => ({
			label: item.title,
			value: item.value,
			children: item.children,
		}))
	}, [buildingId, buildingList])
	// 房间
	const roomData = useMemo(() => {
		if (!floorId || !floorData) return undefined
		const data = floorData.find((item: any) => item.value === floorId)
		if (!data) return undefined
		return data.children?.map((item: any) => ({
			label: item.title,
			value: item.value,
		}))
	}, [floorId, floorData])

	// 楼栋改变 重置楼层
	useEffect(() => {
		setFloorId(undefined)
	}, [buildingId])
	// 楼层改变 重置房间
	useEffect(() => {
		setRoomId(undefined)
	}, [buildingId])

	const renderData = (() => {
		if (loading)
			return (
				<div className='flex h-64 items-center justify-center w-full'>
					<Spin size='large' />
				</div>
			)
		if (!list || list.length === 0)
			return (
				<div className='flex h-64 items-center justify-center w-full'>
					<Empty />
				</div>
			)
		return list.map((item: BedItem) => (
			<BedCard bedItem={item} key={item!.id} />
		))
	})()

	const renderPlaceholder = (() => {
		return Array.from({ length: (list ? list.length : 0) % 7 }, (_, i) => (
			<div key={i} className={styles.bed_card_placeholder}></div>
		))
	})()
	return (
		<main>
			{/* 楼层 */}
			<div className={styles.filter_bar}>
				<BaseForm ref={formRef} submitConfig={false} className='px-4'>
					<ProFormRadio
						label='楼栋'
						name='buildingId'
						optionType='button'
						buttonStyle='solid'
						options={buildingData}
						formItemClassName={styles.filter_item}
						onChange={(e) => {
							setBuildingId(e.target.value)
						}}
					/>
					<ProFormRadio
						label='楼层'
						name='floor'
						initialValue={1}
						optionType='button'
						buttonStyle='solid'
						options={floorData}
						onChange={(e) => {
							setFloorId(e.target.value)
						}}
						formItemClassName={styles.filter_item}
					/>
					<ProFormRadio
						label='房间'
						name='room'
						optionType='button'
						buttonStyle='solid'
						options={roomData}
						formItemClassName={styles.filter_item}
						onChange={(e) => {
							setRoomId(e.target.value)
						}}
					/>
					<div className='flex items-center'>
						<ProFormRadio
							name='status'
							label='状态'
							optionType='button'
							buttonStyle='solid'
							options={statusData}
							formItemClassName={styles.filter_item}
						/>
						<ReloadOutlined
							onClick={() => fetchData()}
							className='flex-1 text-right cursor-pointer pr-4'
						/>
					</div>
				</BaseForm>
			</div>
			{/* 病床 */}
			<BCGContext.Provider value={{ visible, toggle, setBedItem }}>
				<div className={styles.bed_card_list}>
					{renderData}
					{renderPlaceholder}
				</div>
				<BCGDetail bedItem={bedItem} />
			</BCGContext.Provider>
		</main>
	)
}

export default Monitor
