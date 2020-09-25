import { useEffect } from "react"
import { IBaseProps } from "@/@types/fc"

function DashBoard(props: IBaseProps) {
	const { children } = props
	useEffect(() => {
		console.log("in DashBoard container")
	}, [])
	return children
}

export default DashBoard
