import PageHeaderWrap from "@/components/PageHeaderWrap"
import React from "react"

function CanvasDemo(props: any) {
	return (
		<div className=''>
			<PageHeaderWrap title='canvas 图片剪裁' className='bg-white' />
			<main className='content m-8'>画布</main>
			{props.children}
		</div>
	)
}

export default CanvasDemo
