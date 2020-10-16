import React from "react"
import PageHeaderWrap from "@/components/PageHeaderWrap"

import ListItem from "./ListItem"
function CanvasDemo(props: any) {
	return (
		<div className=''>
			<PageHeaderWrap title='canvas 图片剪裁' className='bg-white' />
			<main className='content m-8'>
				画布
				<div>
					<h1>test</h1>
					<article>2112</article>
					<div>
						<ListItem id={1} />
						<ListItem id={2} />
					</div>
				</div>
			</main>
		</div>
	)
}

export default CanvasDemo
