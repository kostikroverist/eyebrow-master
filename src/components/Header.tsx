"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-[#5D3954] bg-opacity-80 w-full absolute top-0 left-0 z-10 ">
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex justify-between items-center h-18">
        <h1 className="text-2xl font-bold text-white">My Website</h1>

        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="text-white hover:text-pink-400 transition-colors duration-300 font-medium text-lg"
              >
                Домашня Сторінка
              </Link>
            </li>
            <li>
              <Link
                href="/service"
                className="text-white hover:text-pink-400 transition-colors duration-300 font-medium text-lg"
              >
                Послуги
              </Link>
            </li>
            <li>
              <Link
                href="/booking"
                className="text-white hover:text-pink-400 transition-colors duration-300 font-medium text-lg"
              >
                Забронювати
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-white hover:text-pink-400 transition-colors duration-300 font-medium text-lg"
              >
                Контакт
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className="md:hidden text-white p-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-90 text-white p-4 z-50 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">My Website</h1>
            <button
              className="text-white p-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>
          <ul className="flex flex-col space-y-5 items-center">
            <li>
              <Link
                href="/"
                className="block w-full text-center py-3 px-4 rounded-lg text-white hover:bg-gray-700 transition-colors duration-300 text-lg"
                onClick={toggleMenu}
              >
                Домашня Сторінка
              </Link>
            </li>
            <li>
              <Link
                href="/service"
                className="block w-full text-center py-3 px-4 rounded-lg text-white hover:bg-gray-700 transition-colors duration-300 text-lg"
                onClick={toggleMenu}
              >
                Послуги
              </Link>
            </li>
            <li>
              <Link
                href="/booking"
                className="block w-full text-center py-3 px-4 rounded-lg text-white hover:bg-gray-700 transition-colors duration-300 text-lg"
                onClick={toggleMenu}
              >
                Забронювати
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block w-full text-center py-3 px-4 rounded-lg text-white hover:bg-gray-700 transition-colors duration-300 text-lg"
                onClick={toggleMenu}
              >
                Контакт
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Header;
