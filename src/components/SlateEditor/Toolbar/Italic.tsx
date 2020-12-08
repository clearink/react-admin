import { Button } from "antd"
import React, { memo, useCallback } from "react"
import { useSlate } from "slate-react"
import CustomEditor from "../utils/CustomEditor"

function Italics() {
	const editor = useSlate()
	const handleToggleCode = useCallback(() => {
		CustomEditor.toggleItalics(editor)
	}, [editor])
	return <Button onClick={handleToggleCode}>斜体</Button>
}

export default memo(Italics)
