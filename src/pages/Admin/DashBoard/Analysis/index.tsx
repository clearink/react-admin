import React, { useEffect } from "react"
import { IBaseProps } from "@/@types/fc"
import { Card, Col, Row, Statistic, Tooltip } from "antd"
import useBoolean from "@/hooks/useBoolean"
import IconFont from "@/components/IconFont"
import "./style.scss"
function Analysis(props: IBaseProps) {
	const [loading, toggle] = useBoolean(true)
	useEffect(() => {
		const timer = setTimeout(() => {
			toggle()
		}, 1000)
		return () => {
			clearTimeout(timer)
		}
	}, [toggle])
	return (
		<div className='analysis-page min-h-full m-8'>
			<Row gutter={[16, 16]}>
				<Col sm={12} xl={6}>
					<Card loading={loading} className='card-container'>
						<Statistic
							title={
								<div className='flex justify-between items-center'>
									<span>总销售额</span>
									<Tooltip title='指标说明'>
										<IconFont
											type='icon-info-circle'
											className='cursor-pointer text-3xl'
										/>
									</Tooltip>
								</div>
							}
							value={1234567}
							prefix='¥'
						/>
						<div className='content h-16 flex items-center'>
							<span className='mr-4'>
								周同比 12%
								<IconFont
									type='icon-caret-up-anticoncopy'
									className='ml-3 text-base'
								/>
							</span>
							<span>
								日同比 11%
								<IconFont type='icon-caret-down' className='ml-3 text-base' />
							</span>
						</div>
						<div className='footer'>
							日销售额 ￥{new Intl.NumberFormat().format(12312312)}
						</div>
					</Card>
				</Col>
				<Col sm={12} xl={6}>
					<Card loading={loading} className='card-container'>
						<Statistic
							title={
								<div className='flex justify-between items-center'>
									<span>总销售额</span>
									<Tooltip title='指标说明'>
										<IconFont
											type='icon-info-circle'
											className='cursor-pointer text-3xl'
										/>
									</Tooltip>
								</div>
							}
							value={1234567}
							prefix='¥'
						/>
						<div className='content h-16 flex items-center'>
							<span className='mr-4'>
								周同比 12%
								<IconFont
									type='icon-caret-up-anticoncopy'
									className='ml-3 text-base'
								/>
							</span>
							<span>
								日同比 11%
								<IconFont type='icon-caret-down' className='ml-3 text-base' />
							</span>
						</div>
						<div className='footer'>
							日销售额 ￥{new Intl.NumberFormat().format(12312312)}
						</div>
					</Card>
				</Col>
				<Col sm={12} xl={6}>
					<Card loading={loading} className='card-container'>
						<Statistic
							title={
								<div className='flex justify-between items-center'>
									<span>总销售额</span>
									<Tooltip title='指标说明'>
										<IconFont
											type='icon-info-circle'
											className='cursor-pointer text-3xl'
										/>
									</Tooltip>
								</div>
							}
							value={1234567}
							prefix='¥'
						/>
						<div className='content h-16 flex items-center'>
							<span className='mr-4'>
								周同比 12%
								<IconFont
									type='icon-caret-up-anticoncopy'
									className='ml-3 text-base'
								/>
							</span>
							<span>
								日同比 11%
								<IconFont type='icon-caret-down' className='ml-3 text-base' />
							</span>
						</div>
						<div className='footer'>
							日销售额 ￥{new Intl.NumberFormat().format(12312312)}
						</div>
					</Card>
				</Col>
				<Col sm={12} xl={6}>
					<Card loading={loading} className='card-container'>
						<Statistic
							title={
								<div className='flex justify-between items-center'>
									<span>总销售额</span>
									<Tooltip title='指标说明'>
										<IconFont
											type='icon-info-circle'
											className='cursor-pointer text-3xl'
										/>
									</Tooltip>
								</div>
							}
							value={1234567}
							prefix='¥'
						/>
						<div className='content h-16 flex items-center'>
							<span className='mr-4'>
								周同比 12%
								<IconFont
									type='icon-caret-up-anticoncopy'
									className='ml-3 text-base'
								/>
							</span>
							<span>
								日同比 11%
								<IconFont type='icon-caret-down' className='ml-3 text-base' />
							</span>
						</div>
						<div className='footer'>
							日销售额 ￥{new Intl.NumberFormat().format(12312312)}
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default Analysis
