import React, { useState } from "react"
import { IBaseProps } from "@/@types/fc"
import PageHeaderWrap from "@/components/PageHeaderWrap"

function StepForm(props: IBaseProps) {
	return (
		<div className='w-full min-h-full bg-white'>
			<PageHeaderWrap title='分布表单' />
		</div>
	)
}

export default StepForm
