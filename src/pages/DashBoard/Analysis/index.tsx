import React, { useEffect } from "react"
import { IBaseProps } from "@/@types/fc"
import { Card, Col, Row } from "antd"
import useBoolean from "@/hooks/useBoolean"

function Analysis(props: IBaseProps) {
	const [loading, toggle] = useBoolean(true)
	useEffect(() => {
		setTimeout(() => {
			toggle()
		}, 2000)
	}, [toggle])
	return (
		<div className='min-h-full mt-1 mx-4'>
			<Row gutter={16} className='overflow-auto'>
				<Col span={6}>
					<Card loading={loading}>asas</Card>
				</Col>
				<Col span={6}>
					<Card loading={loading}>asas</Card>
				</Col>
				<Col span={6}>
					<Card loading={loading}>asas</Card>
				</Col>
				<Col span={6}>
					<Card loading={loading}>asas</Card>
				</Col>
			</Row>
		</div>
	)
}

export default Analysis
