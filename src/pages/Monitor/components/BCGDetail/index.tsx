import React, {
	PropsWithChildren,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react"
import { actions } from "@/store/reducers/user"
import useTypedSelector from "@/hooks/useTypedSelector"
import { CloseCircleOutlined } from "@ant-design/icons"
import { Modal } from "antd"
import { BCGContext, BedItem } from "../.."
import useUnwrapAsyncThunk from "@/hooks/useUnwrapAsyncThunk"
import charts from "charts"
import echarts from "echarts"
console.log("echarts", "window.echarts", echarts, window.echarts)

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

	const chartRef = useRef<any>(null)

	// 数据请求
	useEffect(() => {
		if (!bedItem || !deviceToken) return

		const socket = new WebSocket("ws://stream.darma.cn:17004/ws")

		// 登录
		socket.onopen = () => {
			if (socket.readyState === socket.OPEN)
				socket.send(
					JSON.stringify({
						msgType: "login",
						data: {
							token: deviceToken,
							deviceNo: bedItem.deviceNum,
						},
					})
				)
		}
		// 获取数据
		socket.onmessage = (e) => {
			const response = JSON.parse(e.data) as SocketResponse

			// 心率
			if (response.msgType === "heartBreathBcg") {
				setHeartList(response.data.orgDataInt)
			}
			// 呼吸率
			if (response.msgType === "healthBreathData") {
			}
		}
		return () => {
			socket.close()
		}
	}, [bedItem, deviceToken])

	// 心率
	const heartRef = useRef<HTMLDivElement>(null)
	const [heartList, setHeartList] = useState<Array<number>>([])
	// 呼吸率
	const breathRef = useRef<HTMLDivElement>(null)
	const [breathList, setBreathList] = useState<Array<number>>([])
	// 心率
	useEffect(() => {
		const heartElement = heartRef.current
		if (!heartElement || !bedItem || chartRef.current) return
		chartRef.current = charts().init(heartElement)
		console.log("echarts init success")
	}, [bedItem])

	useEffect(() => {
		if (heartList.length === 0 || !chartRef.current) return
		const option = {
			title: {
				text: "心率",
			},
			xAxis: {
				name: "x",
			},
			yAxis: {
				name: "y",
			},
			series: [
				{
					name: "销量",
					type: "line",
					data: heartList,
				},
			],
		}
		chartRef.current.setOption(option)
	}, [heartList])
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
			<div
				className='heart-container'
				ref={heartRef}
				style={{ width: 600, height: 400 }}
			></div>
			{/*呼吸率  */}
			<div className='breath-container' ref={breathRef}></div>
		</Modal>
	)
}

export default BCGDetail
