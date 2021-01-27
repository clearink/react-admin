import React, { useRef } from "react"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { ProFormInput } from "@/components/BigSight"
import { Button } from "antd"
import { sleep } from "@/utils/test"
function WorkPlace() {
	const drawerRef = useRef<any>()
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-10 pb-0 flex-auto m-10 '></main>
		</div>
	)
}

export default WorkPlace
