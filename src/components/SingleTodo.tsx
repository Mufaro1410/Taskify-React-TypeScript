import React, { useEffect, useRef, useState } from "react"
import { Todo } from "../models"
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import '../assets/styles/styles.css'

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDelete = (id:number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleDone = (id:number) => {
    setTodos(todos.map((todo) => 
      todo.id === id ? {...todo, isDone:!todo.isDone} : todo
      )
    );
  };

  const handleEdit = (e:React.FormEvent, id:number) => {
    e.preventDefault();
    setTodos(todos.map((todo) => (
      todo.id === id ? {...todo, todo:editTodo} : todo
    )));
    setEditMode(false)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode])

  return (
    <form className="todos_single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {editMode ? (
        <input
          ref={inputRef}
          type="text"
          value={editTodo}
          className="todos_single-text"
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : (
        todo.isDone ? (
          <s className="todos_single-text">{todo.todo}</s>
        ) : (
          <span className="todos_single-text">{todo.todo}</span>
        )
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
              if (!editMode && !todo.isDone) {
                setEditMode(!editMode)
              }
            }
          }
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>
        <span className="icon" onClick={() => handleDone(todo.id)}><MdDone /></span>
      </div>
    </form>
  )
}

export default SingleTodo