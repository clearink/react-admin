import configs from "@/configs/app"
export default function GetFullUrl(url: string) {
	if (/^http/.test(url) || !url) return url
	return `${configs.MEDIA_URL}/${url}`
}
