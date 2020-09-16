import React, { memo, useEffect } from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"
import { fetchList } from "@/store/reducers/list"
import { Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/store"
import { unwrapResult } from "@reduxjs/toolkit"

function Home(props: IBaseProps) {
	const { list, loading } = useSelector((state: AppState) => state.list)
	const dispatch = useDispatch()
	// useEffect(() => {
	// 	const promise = dispatch<any>(fetchList())
	// 	return () => {
	// 		console.log("clear", promise.abort)
	// 		// promise.abort() // 待研究
	// 	}
	// }, [dispatch, push])

	return (
		<div className='app-wrapper'>
			Home page <Link to='/login'>to login</Link>
			<Button
				type='primary'
				loading={loading}
				onClick={async () => {
					const resultAction = await dispatch(fetchList())
					unwrapResult<any>(resultAction) // 抛出异常
				}}
			>
				get list
			</Button>
			{list.map((item) => (
				<div key={item.id}>
					<h2>{item.title}</h2>
					<p>{item.text}</p>
				</div>
			))}
		</div>
	)
}

export default memo(Home)
