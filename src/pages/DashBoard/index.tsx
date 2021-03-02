import React, { useCallback, useEffect } from "react"
import PageHeaderWrap from "@/components/PageHeaderWrap"
import { Button } from "antd"
import { actions } from "@/store/reducers/test"
import useAppDispatch from "@/hooks/useAppDispatch"
import useUnwrapAsyncThunk from "@/hooks/useUnwrapAsyncThunk"

function WorkPlace() {
	const unwrap = useUnwrapAsyncThunk()

	return (
		<div className='dashboard_page__wrap h-full flex flex-col '>
			<PageHeaderWrap ghost={false} title='工作台' subTitle='hhhh' />
			<main className='p-10 pb-0 flex-auto m-10 '>
				<Button
					onClick={async () => {
						const result = await unwrap(actions.testApi("123"))[0]
						console.log("success fetch, result", result)
					}}
				>
					test async thunk
				</Button>
			</main>
		</div>
	)
}

export default WorkPlace
