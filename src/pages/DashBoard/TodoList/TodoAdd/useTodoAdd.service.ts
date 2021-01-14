import { message } from "antd"
import { Todo } from "./../useTodoList.service"
import { useContext } from "react"
import GetServiceContext from "@/utils/store/GetServiceContext"
import { TodoListServiceContext } from "../useTodoList.service"

export const TodoAddServiceContext = GetServiceContext(useTodoAddService)
export default function useTodoAddService() {
	const TodoListService = useContext(TodoListServiceContext)
	const handleAdd = (values: Todo) => {
		const hasExist = TodoListService.list.some(
			(item) => item.title === values.title
		)
		if (hasExist) {
			message.error("名称必须唯一")
		} else TodoListService.setList((list) => list.concat(values))
	}
	return { handleAdd }
}
