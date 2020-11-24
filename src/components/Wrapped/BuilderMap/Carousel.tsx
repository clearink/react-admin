import React, { memo } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Carousel } from "zarm"
import { nanoid } from "@reduxjs/toolkit"

interface IProps {
	imgList: string[]
	autoPlay: boolean
	[key: string]: any
}

// 必须让跑马灯组件在每次数据更改后重新渲染
function WrappedCarousel(props: IProps) {
	const { imgList, ...rest } = props
	console.log("WrappedCarousel", props)
	const id = nanoid(8)
	return (
		<Carousel key={id} {...rest}>
			{imgList.map((item) => (
				<img key={item} src={item} alt='cover' />
			))}
		</Carousel>
	)
}

export default memo(withDefaultProps(WrappedCarousel, { imgList: [] }))
