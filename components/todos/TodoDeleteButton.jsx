"use client";

const TodoDeleteButton = ({ todo, toast }) => {
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
          method: "DELETE",
        });

        console.dir(res);

        if (res.ok) {
          toast.success("Success deleted todo");
        } else {
          toast.error("Errore don't deleted todo");
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
