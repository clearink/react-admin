import { Button } from "antd"
import React, { memo } from "react"
import { useSlate } from "slate-react"
import CustomEditor from "../utils/CustomEditor"

function TextUnderLine() {
	const editor = useSlate()
	const handleClick = () => {
		CustomEditor.toggleUnderLine(editor)
	}
	return <Button onClick={handleClick}>下划线</Button>
}

export default memo(TextUnderLine)
