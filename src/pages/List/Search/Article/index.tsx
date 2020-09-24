import React from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from '@/components/PageHeaderWrap'

function Article(props: IBaseProps) {
	return (
		<div className=''>
			<PageHeaderWrap ghost={false} title='搜索列表（文章）' subTitle='hhhh' />
		</div>
	)
}

export default Article
