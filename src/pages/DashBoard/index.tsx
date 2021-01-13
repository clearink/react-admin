import React from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { TableForm } from "@/components/Pro/ProForm"
import UserAlarmDetail from "@/components/PepLife/HeaderExtra/UserAlarm/UserAlarmDetail/UserAlarm.Detail"
import { BSTreeSelect } from "@/components/BigSight"
import { convertTreeNode } from "../BedAllot/utils"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"

function WorkPlace(props: IBaseProps) {
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-10 pb-0 flex-auto m-10 '>
				<div>ProFormUploadList</div>

				<TableForm />
				<UserAlarmDetail />
			</main>
		</div>
	)
}

export default WorkPlace
