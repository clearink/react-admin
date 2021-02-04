import React, { createContext, useMemo, useRef, useState } from "react"
import { Spin } from "antd"
import styles from "./style.module.scss"
import BedCard from "./components/BedCard"
import BCGDetail from "./components/BCGDetail"
import useBoolean from "@/hooks/useBoolean"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import { ProFormRadio } from "@/components/Pro/ProForm"
import { FormInstance } from "antd/lib/form"
import useMemoFetch from "@/hooks/useMemoFetch"
import { convertTreeNode } from "../BedAllot/utils"

interface BCGContextProps {
	visible: boolean
	toggle: () => void
	setBcgId?: React.Dispatch<React.SetStateAction<any>>
}
export const BCGContext = createContext<BCGContextProps>({
	visible: false,
	toggle: () => {},
})

const statusData = ["全部(30)", "在床(27)", "离床(2)", "离线(1)"]
// 监控分析
function Monitor() {
	const [bcgId, setBcgId] = useState(undefined)
	const [visible, toggle] = useBoolean()
	const formRef = useRef<FormInstance>()

	const [{ data: buildingList, loading }, _, updateMemo] = useMemoFetch({
		url: "/orgmgt/building/treeList",
		method: "post",
		cache: true,
		transform: (response, cache) => {
			if (cache) return response
			if (response) return convertTreeNode(response?.result, "orgBuildings")
			return []
		},
	})

	const [buildingId, setBuildingId] = useState<string | undefined>() // 楼栋ID
	const [floorId, setFloorId] = useState<string | undefined>() // 楼层ID
	const [roomId, setRoomId] = useState<string | undefined>() // 房间ID

	// 楼栋数据
	const buildingData = useMemo(() => {
		if (buildingList)
			return buildingList.map((item: any) => ({
				label: item.title,
				value: item.key,
			}))
	}, [buildingList])

	// 楼层数据
	const floorData = useMemo(() => {
		if (buildingList) {
			const data = buildingList.find((item: any) => item.key === buildingId)
			console.log(data)
			if (data) {
				return data.children?.map((item: any) => ({
					label: item.title,
					value: item.key,
				}))
			}
		}
	}, [buildingId, buildingList])

	// 房间数据
	const [{ data: roomData }] = useMemoFetch({
		url: floorId ? "/orgmgt/room/list/queryByBuildingId" : undefined,
		params: { id: floorId },
		transform: (response) => {
			return response.result.map((item: any) => ({
				label: item.num,
				value: item.id,
			}))
		},
	})
	return (
		<main>
			{/* 楼层 */}
			<div className={styles.filter_bar}>
				<Spin spinning={loading}>
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
								console.log("将发起请求")
							}}
						/>
						<ProFormRadio
							name='status'
							label='状态'
							optionType='button'
							buttonStyle='solid'
							options={statusData}
							formItemClassName={styles.filter_item}
						/>
					</BaseForm>
				</Spin>
			</div>
			{/* 病床 */}
			<BCGContext.Provider value={{ visible, toggle, setBcgId }}>
				<div className={styles.bed_card_list}>
					{Array.from({ length: 20 }, (_, i) => (
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
