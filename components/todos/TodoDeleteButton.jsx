"use client";

const TodoDeleteButton = ({ todo }) => {
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();

        const res = await fetch(
          `http://localhost:3000/api/todos/${todo.id}`,
          { id: todo.id },
          {
            method: "DELETE",
          }
        );

        console.dir(res);

        if (res.ok) {
          alert("Todo deleted!");

          window.location.reload();
        } else {
          alert("Error deleting todo");
        }
      }}
    >
      <p className="bg-red-400 p-4 mt-4 inline-block rounded-md cursor-pointer">
        Delete
      </p>
    </button>
  );
};

export default TodoDeleteButton;
