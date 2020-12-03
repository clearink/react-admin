import React from "react"
import { IBaseProps } from "@/@types/fc"
import { Button } from "antd"
import GetBoundAction from "@/utils/GetBoundAction"
import { actions } from "@/store/reducers/menu"

const boundToggle = GetBoundAction(actions.toggle)

function Application(props: IBaseProps) {
	return (
		<div>
			<Button onClick={boundToggle}>toggleMenu</Button>
		</div>
	)
}

export default Application
