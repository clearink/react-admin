import { useEffect } from "react"
export default function useTitle(title: string) {
	useEffect(() => {
		const baseTitle = process.env.REACT_APP_SITE_NAME
		if (baseTitle) document.title = `${baseTitle} - ${title}`
		else document.title = title
	}, [title])
}
