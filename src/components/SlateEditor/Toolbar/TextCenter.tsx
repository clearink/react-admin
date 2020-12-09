import { Button } from "antd"
import React, { memo } from "react"
import { useSlate } from "slate-react"
import CustomEditor from "../utils/CustomEditor"

function TextCenter() {
	const editor = useSlate()
	const handleClick = () => {
		CustomEditor.toggleTextCenter(editor)
	}
	return <Button onClick={handleClick}>居中</Button>
}

export default memo(TextCenter)
