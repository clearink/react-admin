import React from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { TableForm } from "@/components/Pro/ProForm"
import TodoList from "./TodoList"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import { BSAvatar, BSUploadList } from "@/components/BigSight"
import { Divider } from "antd"

function WorkPlace(props: IBaseProps) {
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-10 pb-0 flex-auto m-10 '>
				{/* <div>ProFormUploadList</div>
				<TableForm /> */}
				<TodoList />
				<Divider />
				<BaseForm onFinish={console.log}>
					<BSAvatar name='avatar' label='avatar' />
					<BSUploadList name='file' label='list' />
				</BaseForm>
			</main>
		</div>
	)
}

export default WorkPlace
