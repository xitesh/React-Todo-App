const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`w-full p-4 text-center text-sm mt-auto border-t ${
        darkMode
          ? "bg-gray-900 border-gray-700 text-gray-400"
          : "bg-black border-gray-700 text-white"
      }`}
    >
      <p>© 2025 Todo App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
