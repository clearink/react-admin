import { Button } from "antd"
import React, { memo, useCallback } from "react"
import { useSlate } from "slate-react"
import CustomEditor from "../utils/CustomEditor"

function Code() {
	const editor = useSlate()
	const handleToggleCode = useCallback(() => {
		CustomEditor.toggleCodeBlock(editor)
	}, [editor])
	return <Button onClick={handleToggleCode}>代码</Button>
}

export default memo(Code)
