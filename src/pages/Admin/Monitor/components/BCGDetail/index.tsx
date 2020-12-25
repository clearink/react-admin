import ModalTrigger, { IModalTriggerRef } from "@/components/ModalTrigger"
import useBoolean from "@/hooks/useBoolean"
import { CloseCircleOutlined } from "@ant-design/icons"
import { Modal } from "antd"
import React, {
	PropsWithChildren,
	ReactNode,
	useContext,
	useEffect,
	useRef,
} from "react"
import { BCGContext } from "../.."

// 用户BCG 数据
// 用一个ModalTrigger承载 主要是要请求数据
interface BCGDetailProps {
	id: string | number | undefined
}
function BCGDetail(props: PropsWithChildren<BCGDetailProps>) {
	const { id } = props
	const { visible, toggle } = useContext(BCGContext)
	useEffect(() => {
		if (!id) return
		console.log("fetch detail")
	}, [id])
	return (
		<Modal
			width={800}
			visible={visible}
			title={
				<h3 className='flex'>
					<span>心率/呼吸率</span>
					<span className='flex-auto text-center text-blue-400'>
						[五楼] [507] [02床] 张三丰（612044000000）
					</span>
				</h3>
			}
			onCancel={toggle}
			centered
			closeIcon={<CloseCircleOutlined style={{ fontSize: 25 }} />}
			footer={null}
		>
			<p>12321</p>
			<p>12321</p>
			<p>12321</p>
			<p>12321</p>
		</Modal>
	)
}

export default BCGDetail
