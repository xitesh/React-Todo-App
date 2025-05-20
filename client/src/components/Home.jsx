import { useEffect, useState } from "react";
import Create from "./Create";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const result = await axios.get("http://localhost:3000/get");
        setTodos(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const checkBoxCheck = async (id) => {
    try {
      const res = await axios.put("http://localhost:3000/update/" + id);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete("http://localhost:3000/delete/" + id);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <main className="flex flex-col items-center flex-grow w-full max-w-xl mx-auto px-4 py-8">
        <h1
          className={`text-4xl font-extrabold mb-6 tracking-wide border-b pb-2 w-full text-center ${
            darkMode ? "border-gray-300" : "border-black"
          }`}
        >
          Todo List
        </h1>

        <Create setTodos={setTodos} todos={todos} darkMode={darkMode} />

        {todos.length === 0 ? (
          <div
            className={`mt-8 text-center font-medium text-xl ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            No Record
          </div>
        ) : (
          <ul className="w-full mt-6 space-y-3">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className={`flex justify-between items-center p-4 rounded shadow ${
                  darkMode ? "bg-gray-800 text-white" : "bg-black text-white"
                }`}
              >
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => checkBoxCheck(todo._id)}
                    className={`w-5 h-5 cursor-pointer accent-${
                      darkMode ? "blue-400" : "white"
                    }`}
                  />
                  <span className={todo.done ? "line-through opacity-70" : ""}>
                    {todo.task}
                  </span>
                </label>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className={`px-3 py-1 rounded hover:bg-gray-300 transition ${
                    darkMode ? "bg-gray-200 text-black" : "bg-white text-black"
                  }`}
                  aria-label={`Delete todo: ${todo.task}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Home;
