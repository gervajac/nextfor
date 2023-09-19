"use client";

import { useState } from "react";

import Link from "next/link";
const links = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "About",
    route: "/about",
  },
  {
    label: "Post",
    route: "/post",
  },
];

export function Navigation() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  return (
    <header>
      <nav className="bg-gray-800 border-b-2 border-blue-500 justify-center p-4 flex items-center">
        <div className="flex items-center">
          <div className="text-white font-bold text-xl mr-8">LOGO</div>
        </div>
        <div className="flex space-x-4">
          <div className="relative group">
            <div
              onMouseEnter={() => {
                setOpen1(true);
                setOpen2(false);
                setOpen3(false);
                setOpen4(false);
              }}
              className="cursor-pointer text-white p-2 rounded"
            >
              Programacion
            </div>
            <div
              onMouseLeave={() => setOpen1(false)}
              className={`${
                open1 ? "block" : "hidden"
              } bg-blue-400 absolute mt-2 p-2 shadow-md rounded`}
            >
                <button className="cursor-pointer text-black hover:text-white">Novedades</button>
                <button className="cursor-pointer text-black hover:text-white">Problemas</button>
                <button className="cursor-pointer text-black hover:text-white">Ayuda</button>
            </div>
          </div>
          <div className="relative group">
            <div
              onMouseEnter={() => {
                setOpen1(false);
                setOpen2(true);
                setOpen3(false);
                setOpen4(false);
              }}
              className="cursor-pointer text-white p-2 rounded"
            >
              Empleos
            </div>
            <div
              onMouseLeave={() => setOpen2(false)}
              className={`${
                open2 ? "block" : "hidden"
              } bg-white absolute mt-2 p-2 shadow-md rounded`}
            >
              <div className="bg-white shadow-md rounded py-2 px-4 w-auto">
                <div className="cursor-pointer text-black">Subopción 2.1</div>
                <div className="cursor-pointer">Subopción 2.2</div>
                <div className="cursor-pointer">Subopción 2.3</div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div
              onMouseEnter={() => {
                setOpen1(false);
                setOpen2(false);
                setOpen3(true);
                setOpen4(false);
              }}
              className="cursor-pointer text-white p-2 rounded"
            >
              Compraventa
            </div>
            <div
              onMouseLeave={() => setOpen3(false)}
              className={`${
                open3 ? "block" : "hidden"
              } bg-white absolute mt-2 p-2 shadow-md rounded`}
            >
              <div className="bg-white shadow-md rounded py-2 px-4 w-auto">
                <div className="cursor-pointer text-black">Subopción 3.1</div>
                <div className="cursor-pointer">Subopción 3.2</div>
                <div className="cursor-pointer">Subopción 3.3</div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div
              onMouseEnter={() => {
                setOpen1(false);
                setOpen2(false);
                setOpen3(false);
                setOpen4(true);
              }}
              className="cursor-pointer text-white p-2 rounded"
            >
              Educacion
            </div>
            <div
              onMouseLeave={() => setOpen4(false)}
              className={`${
                open4 ? "block" : "hidden"
              } bg-white absolute mt-2 p-2 shadow-md rounded`}
            >
              <div className="bg-white shadow-md rounded py-2 px-4 w-auto">
                <div className="cursor-pointer text-black">Subopción 4.1</div>
                <div className="cursor-pointer">Subopción 4.2</div>
                <div className="cursor-pointer">Subopción 4.3</div>
              </div>
            </div>
          </div>
          <Link href="/login" as={`/login`} className="flex">
              <button className="flex justify-center items-center rounded-lg px-3 bg-yellow-600">Ingresar</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
