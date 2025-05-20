import { FaSun, FaMoon } from "react-icons/fa";

const Header = ({ darkMode, toggleTheme }) => {
  return (
    <header
      className={`w-full p-4 border-b ${
        darkMode
          ? "bg-gray-900 border-gray-700 text-white"
          : "bg-black border-gray-700 text-white"
      } flex justify-between items-center`}
    >
      <h1 className="text-3xl font-extrabold tracking-wide">Todo</h1>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="p-2 rounded hover:bg-gray-700 transition"
      >
        {darkMode ? <FaSun size={20} color="#FFD700" /> : <FaMoon size={20} />}
      </button>
    </header>
  );
};

export default Header;
