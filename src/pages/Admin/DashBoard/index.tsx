import React from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import StepsForm from "@/components/Pro/ProForm/components/StepsForm"
import { ProFormText } from "@/components/Pro/ProForm/components"
import { FieldCheckbox } from "@/components/Pro/ProField"
function WorkPlace(props: IBaseProps) {
	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-20 flex-auto m-10'>
				<StepsForm>
					<StepsForm.StepForm
						onFinish={(values, form) => true}
						stepProps={{
							title: "第一步",
						}}
					>
						<ProFormText
							name='123'
							label='第一步'
							rules={[{ required: true }]}
						/>
					</StepsForm.StepForm>
					<StepsForm.StepForm
						onFinish={() => true}
						stepProps={{
							title: "第二步",
						}}
					>
						<ProFormText
							name='12323'
							label='第二步'
							rules={[{ required: true }]}
						/>
					</StepsForm.StepForm>
					<StepsForm.StepForm
						onFinish={() => true}
						stepProps={{
							title: "第三步",
						}}
					>
						<ProFormText
							name='1232223'
							label='第三步'
							rules={[{ required: true }]}
						/>
					</StepsForm.StepForm>
				</StepsForm>
			</main>
		</div>
	)
}

export default WorkPlace
