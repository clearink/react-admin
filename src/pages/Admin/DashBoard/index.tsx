import React, { useState } from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import StepsForm from "@/components/Pro/ProForm/components/StepsForm"
import { ProFormText, QueryFilter } from "@/components/Pro/ProForm/components"
import { sleep } from "@/utils/test"
import { Button, Modal } from "antd"
function WorkPlace(props: IBaseProps) {
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-20 flex-auto m-10'>
				<QueryFilter requiredMark={false}>
					<ProFormText name='name' label='应用名称' />
					<ProFormText name='status2' label='应用状态' />
					<ProFormText name='status1' label='应用状态' />
					<ProFormText name='status3' label='应用状态' />
					<ProFormText name='status4' label='应用状态' />
					<ProFormText name='status5' label='应用状态' />
					<ProFormText name='status6' label='应用状态' />
					<ProFormText
						name='status7'
						label='应用状态'
						rules={[{ required: true }]}
					/>
				</QueryFilter>
			</main>
		</div>
	)
}

export default WorkPlace
