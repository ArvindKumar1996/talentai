import React from "react";
import { Logo } from "../assets/logo";

export const Header = () => {
  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="flex justify-between items-center h-16 px-6">
        {/* Left: Logo linking to Home */}
        <a href="/">
          <Logo />
        </a>

        {/* Right: About & FAQ */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium mr-8">
          <a href="#about" className="hover:text-indigo-600 transition-colors">
            About
          </a>
          <a href="#faq" className="hover:text-indigo-600 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Hamburger menu for mobile */}
        <button className="md:hidden focus:outline-none">
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-gray-700"></span>
            <span className="block w-6 h-0.5 bg-gray-700"></span>
            <span className="block w-6 h-0.5 bg-gray-700"></span>
          </div>
        </button>
      </div>
    </header>
  );
};
