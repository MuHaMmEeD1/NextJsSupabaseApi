import Link from "next/link";
import React from "react";
import TodoDeleteButton from "../../components/todos/TodoDeleteButton";

const Todos = async () => {
  const res = await fetch("http://localhost:3000/api/todos");
  const todos = await res.json();

  console.log(todos);

  return (
    <div>
      <h1 className="bg-yellow-300 p-5 text-xl font-bold">Todos</h1>

      <Link href={"/todos/add"}>
        <p className="bg-green-400 p-4 mt-4 inline-block rounded-md">
          Add Todo
        </p>
      </Link>

      <ul className="mt-4">
        {todos.map((todo) => (
          <li key={todo.id} className="p-2 border-b border-gray-300">
            <p>{todo.title}</p>
            <p>{todo.description}</p>

            <Link href={"/todos/edit/" + todo.id}>
              <p className="bg-green-400 p-4 mt-4 inline-block rounded-md">
                Edit
              </p>
            </Link>

            <TodoDeleteButton todo={todo}></TodoDeleteButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
