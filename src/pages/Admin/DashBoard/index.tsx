import React, { useState } from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { ProFormText, QueryFilter } from "@/components/Pro/ProForm/components"
function WorkPlace(props: IBaseProps) {
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-20 flex-auto m-10'>
				<QueryFilter requiredMark={false}>
					{Array.from({ length:6 }, (_, j) => (
						<ProFormText name='name' label='应用名称' key={j} />
					))}
				</QueryFilter>
			</main>
		</div>
	)
}

export default WorkPlace
