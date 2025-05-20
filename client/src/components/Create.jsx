import { useState } from "react";
import axios from "axios";

const Create = ({ setTodos, todos, darkMode }) => {
  const [task, setTask] = useState("");

  const handleAdd = async () => {
    if (!task.trim()) return;
    try {
      const res = await axios.post("http://localhost:3000/add", { task });
      setTodos(res.data); // backend returns updated list
      setTask("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex gap-4 w-full max-w-xl mx-auto mt-4">
      <input
        type="text"
        placeholder="Write Todo..."
        className={`flex-grow border p-3 rounded focus:outline-none focus:ring-2 ${
          darkMode
            ? "border-gray-600 bg-gray-800 text-white focus:ring-blue-400"
            : "border-black bg-white text-black focus:ring-black"
        }`}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button
        onClick={handleAdd}
        className={`px-6 py-3 rounded font-semibold hover:bg-gray-800 transition ${
          darkMode ? "bg-blue-600 text-white" : "bg-black text-white"
        }`}
        aria-label="Add Todo"
      >
        Submit
      </button>
    </div>
  );
};

export default Create;
