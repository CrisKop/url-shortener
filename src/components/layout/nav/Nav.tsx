"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

function Nav() {
  const [state, setState] = useState(false);

  // Replace javascript:void(0) path with your path
  const navigation = [{ title: "Inicio", path: "/" }];

  return (
    <>
      <header className="bg-[#f9fafb]">
        <nav className="bg-transparent relative items-center px-4 mx-auto max-w-screen-xl sm:px-8 sm:flex sm:space-x-6">
          <div className="flex justify-between">
            <Link href="/">
              <Image src="/zapcut-logo.webp" width={40} height={40} alt="Zap" />
            </Link>
            <button
              className="text-gray-500 outline-none sm:hidden"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <ul
            className={` shadow-md rounded-md p-4 flex-1 mt-12 absolute z-20 top-8 right-4 w-64 border sm:shadow-none sm:block sm:border-0 sm:mt-0 sm:static sm:w-auto ${
              state ? "" : "hidden"
            }`}
          >
            <div className="order-1 justify-end items-center space-y-5 sm:flex sm:space-x-6 sm:space-y-0">
              {navigation.map((item, idx) => (
                <li
                  className="text-gray-500 hover:text-[var(--highlight)]"
                  key={idx}
                >
                  <Link href={item.path}>{item.title}</Link>
                </li>
              ))}

              <Link
                href="https://github.com/CrisKop/url-shortener"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-[var(--highlight)] transition"
              >
                <FaGithub size={24} />
                <span>Source Code</span>
              </Link>
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Nav;
