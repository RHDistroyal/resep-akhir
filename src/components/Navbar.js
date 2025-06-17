import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ loggedInUser, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-gray-400 transition duration-300">
            ResepKu
          </Link>
        </div>

        {/* Tombol Hamburger */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "Tutup" : "Menu"}
        </button>

        {/* Menu Navigasi */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex gap-8 absolute md:static top-14 left-0 w-full md:w-auto bg-black md:bg-transparent py-4 md:py-0 md:pl-0 pl-4 transition duration-300`}
        >
          <li className="text-lg font-medium">
            <Link
              to="/"
              className="text-white hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>

          <li className="text-lg font-medium">
            <Link
              to="/favorites"
              className="text-white hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorit
            </Link>
          </li>

          {loggedInUser && (
            <li className="text-lg font-medium">
              <Link
                to="/add-recipe"
                className="text-white hover:text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Tambah Resep
              </Link>
            </li>
          )}

          {loggedInUser ? (
            <li className="text-lg font-medium">
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-400"
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="text-lg font-medium">
              <Link
                to="/login"
                className="text-white hover:text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
