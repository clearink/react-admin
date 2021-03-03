import React, {
	PropsWithChildren,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react"
import { actions } from "@/store/reducers/user"
import classNames from "classnames"
import useTypedSelector from "@/hooks/useTypedSelector"
import { CloseCircleOutlined } from "@ant-design/icons"
import { Modal } from "antd"
import { BCGContext, BedItem } from "../.."
import useUnwrapAsyncThunk from "@/hooks/useUnwrapAsyncThunk"
import styles from "./styles.module.scss"
import charts from "charts"
import {
	HeartChartOption,
	BREATH_LIST_MAX,
	HEART_LIST_MAX,
	BreathChartOption,
	FormatWsData,
	GetWsToken,
} from "./utils"
import IconFont from "@/components/IconFont"
// 用户BCG 数据
// 用一个ModalTrigger承载 主要是要请求数据
interface BCGDetailProps {
	bedItem: BedItem
}
interface SocketResponse {
	msgType: "login" | "heartBreathBcg" | "healthBreathData"
	data: {
		heart: number
		breath: number
		motion: number
		deviceNo: string
		orgDataInt: Array<number>
	}
}

function BCGDetail(props: PropsWithChildren<BCGDetailProps>) {
	const { bedItem } = props
	const { visible, toggle } = useContext(BCGContext)
	const { deviceToken } = useTypedSelector((state) => state.user)
	const unwrap = useUnwrapAsyncThunk()
	useEffect(() => {
		if (deviceToken) return
		const [_, abort] = unwrap(actions.getDeviceToken())
		return abort
	}, [deviceToken, unwrap])

	// 心率
	const heartChartRef = useRef<any>(null)
	const [bpm, setBpm] = useState(0)
	const heartRef = useRef<HTMLDivElement>(null)
	const [heartList, setHeartList] = useState<number[]>([])
	// 呼吸率
	const breathChartRef = useRef<any>(null)
	const [rpm, setRpm] = useState(0)
	const breathRef = useRef<HTMLDivElement>(null)
	const [breathList, setBreathList] = useState<number[]>([])
	// 心率
	useEffect(() => {
		const element = heartRef.current
		if (!element || !bedItem || heartChartRef.current) return
		heartChartRef.current = charts().init(element)
		heartChartRef.current.setOption(HeartChartOption([]))
	}, [bedItem])

	// 心率图实时
	useEffect(() => {
		if (heartList.length === 0 || !heartChartRef.current) return
		heartChartRef.current.setOption(HeartChartOption(heartList))
	}, [heartList])

	// 呼吸率
	useEffect(() => {
		const element = breathRef.current
		if (!element || !bedItem || breathChartRef.current) return
		breathChartRef.current = charts().init(element)
		breathChartRef.current.setOption(BreathChartOption([]))
	}, [bedItem])

	// 呼吸率实时
	useEffect(() => {
		if (breathList.length === 0 || !breathChartRef.current) return
		breathChartRef.current.setOption(BreathChartOption(breathList))
	}, [breathList])

	// 数据请求
	useEffect(() => {
		if (!bedItem || !deviceToken) return
		const socket = new WebSocket("ws://stream.darma.cn:17004/ws")
		// 登录
		socket.onopen = () => {
			if (socket.readyState === socket.OPEN)
				socket.send(GetWsToken(deviceToken, bedItem.deviceNum))
		}
		// 获取数据
		let timer: null | number = null
		socket.onmessage = (e) => {
			const response = JSON.parse(e.data) as SocketResponse
			const { data, msgType } = response
			// [呼吸率, 心率, 呼吸率, 心率, 呼吸率, 心率]
			if (msgType === "heartBreathBcg") {
				if (timer !== null) clearInterval(timer)
				const [newBreathList, newHeartList] = FormatWsData(data.orgDataInt)
				setHeartList((p) => p.concat(newHeartList).slice(-HEART_LIST_MAX))
				setBreathList((p) => p.concat(newBreathList).slice(-BREATH_LIST_MAX))
			}

			if (msgType === "healthBreathData") {
				if (data.heart !== 65436) setBpm(data.heart)
				if (data.breath !== -100) setRpm(data.breath)
			}
		}
		return () => {
			socket?.close()
		}
	}, [bedItem, deviceToken])

	useEffect(() => {
		heartChartRef.current?.setOption(HeartChartOption([]))
		breathChartRef.current?.setOption(BreathChartOption([]))
		setBpm(0)
		setRpm(0)
	}, [bedItem])
	return (
		<Modal
			forceRender
			width={800}
			visible={visible}
			title={
				<h3 className='flex'>
					<span>心率/呼吸率</span>
					<span className='flex-auto text-center text-blue-400'>
						{bedItem?.num} - {bedItem?.memberName}
					</span>
				</h3>
			}
			onCancel={toggle}
			centered
			closeIcon={<CloseCircleOutlined style={{ fontSize: 25 }} />}
			footer={null}
		>
			{/* 心率 */}
			<div className={classNames(styles.chart_wrap, styles.heart_chart)}>
				<div className={styles.type}>
					<IconFont type='icon-heart' className={styles.icon} />
					<span className={styles.name}>心率:</span>
					<div className='text-right'>
						<span className={styles.value}>{bpm}</span>
						<span>bpm</span>
					</div>
				</div>
				<div style={{ height: 200, width: 630 }} ref={heartRef}></div>
			</div>
			{/*呼吸率  */}
			<div className={classNames(styles.chart_wrap, styles.breath_chart)}>
				<div className={styles.type}>
					<IconFont type='icon-lung' className={styles.icon} />
					<span className={styles.name}>呼吸率:</span>
					<div className='text-right'>
						<span className={styles.value}>{rpm}</span>
						<span>rpm</span>
					</div>
				</div>
				<div style={{ height: 200, width: 630 }} ref={breathRef}></div>
			</div>
		</Modal>
	)
}

export default BCGDetail
