import React, { useEffect, useState, useRef } from "react";
import { Todo } from "../models/Model";
import { CiEdit } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoTab: React.FC<props> = ({ index, todo, todos, setTodos }) => {
  //Done function
  const handelDone = (id: number) => {
    // console.log("id", id);
    // console.log("todo.id is", todo.id);
    // console.log("todos", todos);
    // console.log("todo", todo);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  //Delete function
  const handelDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //Edit functionality
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "Drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <CiEdit />
            </span>
            <span className="icon" onClick={() => handelDelete(todo.id)}>
              <MdOutlineDelete />
            </span>
            <span className="icon" onClick={() => handelDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoTab;
