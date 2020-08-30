import React, { memo, useEffect } from "react"
import { IBaseProps } from "@/@types/fc"
import { Link } from "react-router-dom"
import { Button } from "antd"
import { useSelector } from "react-redux"
import { StoreState } from "@/stores"
import api from "@/http/api"

function Home(props: IBaseProps) {
	return (
		<div className='app-wrapper'>
			Home page
			<Link to='/login'>to login</Link>
			<Button
				type='primary'
				onClick={() => {
					api
						.Login({username:'admin',password:"123456"})
						.then((result) => {
							console.log(result)
						})
						.catch((err) => {
							console.log(err)
						})
				}}
			>
				test redux{" "}
			</Button>
		</div>
	)
}

export default memo(Home)
