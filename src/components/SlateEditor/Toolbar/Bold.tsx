import { Button } from "antd"
import React, { memo, useCallback } from "react"
import { useSlate } from "slate-react"
import CustomEditor from "../utils/CustomEditor"

function Bold() {
	const editor = useSlate()
	const handleToggleBold = useCallback(() => {
		CustomEditor.toggleBoldMark(editor)
	}, [editor])
	return <Button onClick={handleToggleBold}>加粗</Button>
}

export default memo(Bold)
