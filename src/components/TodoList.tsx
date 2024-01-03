import "../assets/styles/styles.css"
import { Todo } from "../models";
import SingleTodo from "./SingleTodo";

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}


const TodoList: React.FC<Props> = ({todos, setTodos}) => {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <SingleTodo
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
        />
      ))}
    </div>
  )
}

export default TodoList
