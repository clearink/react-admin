import React, { memo } from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"
import { actions } from "@/store/reducers/list"
import { actions as counterAction } from "@/store/reducers/counter"
import { Button } from "antd"
import { unwrapResult } from "@reduxjs/toolkit"
import useTypedSelector from "@/hooks/useTypedSelector"
import GetBoundAction from "@/utils/GetBoundAction"

const FetchList = GetBoundAction(actions.fetchList)
const Increase = GetBoundAction(counterAction.increase)
function Home(props: IBaseProps) {
	const { loading, entities, ids } = useTypedSelector((state) => state.list)
	return (
		<div className='app-wrapper'>
			Home page <Link to='/login'>to login</Link>
			<Button
				type='primary'
				loading={loading}
				onClick={async () => {
					const resultAction = await FetchList()
					unwrapResult(resultAction) // 抛出异常
				}}
			>
				get list
			</Button>
			<Button onClick={() => Increase()}>123</Button>
			{ids.map((index) => (
				<div key={index}>
					<h2>{entities[index]?.title}</h2>
					<p>{entities[index]?.content}</p>
				</div>
			))}
		</div>
	)
}

export default memo(Home)
