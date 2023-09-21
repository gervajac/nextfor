"use client";

import { useEffect, useState } from "react";

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

  const [connected, setConnected] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("user");
      const isConnected = storage && storage.length > 1;
      if (isConnected) {
        const parsedUserData = JSON.parse(storage);
        setUserData(parsedUserData);
      }
      setConnected(!!isConnected);
    }
  }, []);

  console.log(userData, "conected?");

  return (
    <header>
      <nav className="bg-gray-800 border-b-2 border-orange-500 justify-center p-4 flex items-center">
        <div className="flex items-center">
          <Link href="/post" as={`/post`} className="flex">
            <div className="text-white font-bold text-xl mr-8">LOGO</div>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <Link
              href="/section/programacion"
              as={`/section/programacion`}
              onMouseEnter={() => {
                setOpen1(true);
                setOpen2(false);
                setOpen3(false);
                setOpen4(false);
              }}
              className="cursor-pointer text-white hover:text-orange-700 p-2 rounded"
            >
              Programacion
            </Link>
            <div
              onMouseLeave={() => setOpen1(false)}
              className={`${
                open1 ? "block" : "hidden"
              } bg-orange-400 absolute mt-2 p-2 shadow-md rounded`}
            >
              <button className="cursor-pointer text-black hover:text-white">
                Novedades
              </button>
              <button className="cursor-pointer text-black hover:text-white">
                Problemas
              </button>
              <button className="cursor-pointer text-black hover:text-white">
                Ayuda
              </button>
            </div>
          </div>
          <div className="relative group">
            <Link
              href="/section/empleos"
              as={`/section/empleos`}
              onMouseEnter={() => {
                setOpen1(false);
                setOpen2(true);
                setOpen3(false);
                setOpen4(false);
              }}
              className="cursor-pointer text-white hover:text-orange-700 p-2 rounded"
            >
              Empleos
            </Link>
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
            <Link
              href="/section/educacion"
              as={`/section/educacion`}
              onMouseEnter={() => {
                setOpen1(false);
                setOpen2(false);
                setOpen3(false);
                setOpen4(true);
              }}
              className="cursor-pointer text-white hover:text-orange-700 p-2 rounded"
            >
              Educacion
            </Link>
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
          <div className="flex justify-center items-center flex-row">
            {!connected ? (
              <>
                <Link href="/login" as={`/login`} className="flex">
                  <button className="flex justify-center items-center rounded-lg px-3 bg-yellow-600">
                    Ingresar
                  </button>
                </Link>
                <Link href="/signin" as={`/signin`} className="flex">
                  <button className="flex justify-center items-center rounded-lg px-3 text-yellow-600">
                    Registrarse
                  </button>
                </Link>
              </>
            ) : (
              <div className="relative group">
                <div className="flex flex-row">
                  <button className="flex items-center justify-center mr-2 hover:underline text-orange-600">
                    Crear Post
                  </button>
                  <div
                    onMouseEnter={() => {
                      setOpen1(false);
                      setOpen2(false);
                      setOpen3(true);
                      setOpen4(false);
                    }}
                    className="cursor-pointer text-white p-2 rounded"
                  >
                    <img
                      src={userData.image}
                      className="flex border-2 border-orange-600 max-w-[40px] max-h-[40px]"
                    ></img>
                  </div>
                </div>
                <div
                  onMouseLeave={() => setOpen3(false)}
                  className={`${
                    open3 ? "block" : "hidden"
                  } bg-orange-400 absolute mt-2 shadow-md rounded min-w-[80px] w-auto`}
                >
                  <div className="flex flex-col">
                    <button className="cursor-pointer text-black hover:text-white">
                      Perfil
                    </button>
                    <button className="cursor-pointer text-black hover:text-white">
                      Muro
                    </button>
                    <button className="cursor-pointer text-black hover:text-white">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
