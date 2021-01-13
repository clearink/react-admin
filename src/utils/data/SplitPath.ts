export default function SplitPath(pathname: string): string[] {
	const arr = pathname.split("/")
	return arr
		.map((item, index) => arr.slice(0, index + 1).join("/"))
		.filter((i) => i)
}
