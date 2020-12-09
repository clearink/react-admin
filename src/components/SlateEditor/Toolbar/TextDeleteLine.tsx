import { Button } from "antd"
import React, { memo } from "react"
import { useSlate } from "slate-react"
import CustomEditor from "../utils/CustomEditor"

function TextDeleteLine() {
	const editor = useSlate()
	const handleClick = () => {
		CustomEditor.toggleDeleteLine(editor)
	}
	return <Button onClick={handleClick}>删除线</Button>
}

export default memo(TextDeleteLine)
