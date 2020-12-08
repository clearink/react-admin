import { Button } from "antd"
import React, { memo } from "react"
import { useSlate } from "slate-react"
import CustomEditor from "../utils/CustomEditor"

function LetterSpacing() {
	const editor = useSlate()
	const handleClick = () => {
		CustomEditor.changeLetterSpacing(editor, 2)
	}
	return <Button onClick={handleClick}>字间距</Button>
}

export default memo(LetterSpacing)
