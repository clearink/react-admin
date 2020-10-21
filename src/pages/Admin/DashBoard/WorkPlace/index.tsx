import React from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import "./style.scss"
function WorkPlace(props: IBaseProps) {
	return (
		<div className='dashboard_page__wrap'>
			<div className='dashboard_page__header'>
				<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			</div>
		</div>
	)
}

export default WorkPlace
