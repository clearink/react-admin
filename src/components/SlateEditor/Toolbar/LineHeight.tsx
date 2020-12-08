import { Button } from "antd"
import React, { memo } from "react"
import { useSlate } from "slate-react"
import CustomEditor from "../utils/CustomEditor"

function LineHeight() {
	const editor = useSlate()
	const handleClick = () => {
		CustomEditor.changeLineHeight(editor, 2)
	}
	return <Button onClick={handleClick}>行高</Button>
}

export default memo(LineHeight)
