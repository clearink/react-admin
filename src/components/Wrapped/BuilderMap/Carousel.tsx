import React, { memo, useEffect } from "react"
import withDefaultProps from "@/hocs/withDefaultProps"
import { Carousel } from "zarm"
import { nanoid } from "@reduxjs/toolkit"
import styles from "./style.module.scss"

interface IProps {
	imgList: { href: string; src: string }[]
	autoPlay: boolean
	[key: string]: any
}

// 必须让跑马灯组件在每次数据更改后重新渲染
function WrappedCarousel(props: IProps) {
	const { imgList, ...rest } = props
	const id = nanoid(8)
	console.log("WrappedCarousel", props)
	return (
		<Carousel key={id} {...rest}>
			{([] as { href: string; src: string }[]).map((item) => (
				<a href={item?.href} key={item?.src}>
					<img src={item?.src} alt='cover' className={styles.carousel_img} />
				</a>
			))}
		</Carousel>
	)
}

export default memo(withDefaultProps(WrappedCarousel, { imgList: [] }))
