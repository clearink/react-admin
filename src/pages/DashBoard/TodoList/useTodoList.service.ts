import GetServiceContext from "@/utils/store/GetServiceContext"
import { useState } from "react"

export const TodoListServiceContext = GetServiceContext(useTodoListService)
export interface Todo {
	title: string
	value?: string
}
export default function useTodoListService() {
	const [list, setList] = useState<Array<Todo>>([])
	const handleDelete = (title: string) => {
		setList(list.filter((item) => item.title !== title))
	}
	return { list, setList, handleDelete }
}
