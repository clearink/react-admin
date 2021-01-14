import React from "react"
import useTodoListService, {
	TodoListServiceContext,
} from "./useTodoList.service"
import styles from "./style.module.scss"
import TodoAdd from "./TodoAdd"

function TodoList() {
	const TodoListService = useTodoListService()
	return (
		<TodoListServiceContext.Provider value={TodoListService}>
			<TodoAdd />
			{TodoListService.list.map((item) => {
				return (
					<div className={styles.item} key={item.title}>
						<span className={styles.title}>{item.title}</span>
						<span className={styles.value}>{item.value}</span>
						<span
							className='ml-4 text-red-500'
							onClick={() => TodoListService.handleDelete(item.title)}
						>
							del
						</span>
					</div>
				)
			})}
		</TodoListServiceContext.Provider>
	)
}
export default TodoList
