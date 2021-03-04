import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Button, Space, Spin, Tag } from "antd"
import { actions } from "@/store/reducers/monitor"
import classNames from "classnames"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import { ProForm, ProFormRadio } from "@/components/Pro/ProForm"
import styles from "./style.module.scss"
import { MonitorServiceContext } from "../../useMonitor.service"
import { useDispatch } from "react-redux"
import useTypedSelector from "@/hooks/useTypedSelector"
import { ReloadOutlined } from "@ant-design/icons"
import { useBoolean } from "@/components/Pro/hooks/boolean"
import useMemoFetch from "@/hooks/useMemoFetch"
import { FormInstance } from "antd/lib/form"

const statusData = ["全部(30)", "在床(27)", "离床(2)", "离线(1)"]
function BCGFilter() {
	const dispatch = useDispatch()
	const formRef = useRef<FormInstance>()
	const checkedList = useTypedSelector((state) => state.monitor)
	const [list, setList] = useState<Array<{ label: string; value: string }>>(
		() => checkedList
	)
	const [visible, { toggle }] = useBoolean(false)

	const { treeList, roomId, setRoomId, fetchBed } = useContext(
		MonitorServiceContext
	)

	const [buildingId, setBuildingId] = useState<string | undefined>() // 楼栋ID
	const [floorId, setFloorId] = useState<string | undefined>() // 楼层ID

	// 楼栋数据
	const buildingData = useMemo(() => {
		if (!treeList) return undefined
		return treeList.map((item: any) => ({
			label: item.title,
			value: item.value,
			children: item.children,
		}))
	}, [treeList])

	// 楼层数据
	const floorData = useMemo(() => {
		if (!buildingId || !buildingData) return undefined
		const data = buildingData.find((item: any) => item.value === buildingId)
		if (!data) return undefined
		return data.children?.map((item: any) => ({
			label: item.title,
			value: item.value,
			children: item.children,
		}))
	}, [buildingId, buildingData])

	// 房间数据
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
		formRef.current?.setFieldsValue({
			floor: undefined,
		})
	}, [buildingId])

	// 楼层改变 重置房间
	useEffect(() => {
		setRoomId(null)
		formRef.current?.setFieldsValue({
			room: undefined,
		})
	}, [floorId, setRoomId])

	// 获取床位
	const [{ data: bedList, loading }] = useMemoFetch({
		url: roomId ? "/orgmgt/bed/queryByRoomId" : undefined,
		params: { id: roomId },
		transform: (response, cache) => {
			if (cache) return response
			return (
				response?.result?.map((item: any) => ({
					label: item.num,
					value: item.id,
				})) ?? []
			)
		},
	})

	return (
		<div className={styles.filter_bar}>
			<ProForm className={styles.filter_form} submitConfig={false}>
				<div className='flex justify-between items-center'>
					<ProFormRadio
						name='status'
						label='楼层状态'
						optionType='button'
						buttonStyle='solid'
						options={statusData}
						formItemClassName={classNames(styles.filter_item, "flex-auto")}
					/>
					<ReloadOutlined onClick={() => fetchBed()} className='pr-4' />
				</div>
				<ProFormRadio
					name='status'
					label={
						<div className={styles.label} onClick={toggle}>
							已选床位
						</div>
					}
					optionType='button'
					buttonStyle='solid'
					options={checkedList}
					formItemClassName={classNames(
						styles.filter_item,
						styles.checked_floor_list
					)}
				/>
			</ProForm>
			<ProForm
				ref={formRef}
				onFinish={() => {
					// 更改 store
					dispatch(actions.setList(list))
				}}
				onFieldsChange={(_, all) => {
					console.log(all)
				}}
				submitConfig={{
					render: () => (
						<Space size={10} className={styles.submit}>
							<Button type='primary' htmlType='submit' onClick={toggle}>
								添加
							</Button>
							<Button onClick={toggle}>完成</Button>
						</Space>
					),
				}}
				className={classNames(styles.select_form, {
					[styles.open]: visible,
				})}
			>
				<ProFormRadio
					label='楼栋'
					name='building'
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
				<Spin spinning={loading}>
					<div className={styles.filter_item}>
						<div className={styles.label}>床位</div>
						<div className={styles.list_wrap}>
							{bedList?.map((item: any) => {
								const isChecked = list.find(({ value }) => value === item.value)
								return (
									<Tag.CheckableTag
										key={item.value}
										checked={!!isChecked}
										onChange={(checked) => {
											if (checked) setList((p) => p.concat(item))
											else
												setList((p) =>
													p.filter(({ value }) => value !== item.value)
												)
										}}
									>
										{item.label}
									</Tag.CheckableTag>
								)
							})}
						</div>
					</div>
				</Spin>
			</ProForm>
		</div>
	)
}

export default BCGFilter
