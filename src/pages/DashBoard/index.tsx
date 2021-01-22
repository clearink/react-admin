import React from "react"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { BSUploadList, ProForm, ProFormDate } from "@/components/BigSight"
function WorkPlace() {
	console.log(ProFormDate.defaultProps);
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-10 pb-0 flex-auto m-10 '>
				<ProForm onFinish={console.log}>
					<ProFormDate label='date' />
				</ProForm>
			</main>
		</div>
	)
}

export default WorkPlace
