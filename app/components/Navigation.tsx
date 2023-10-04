"use client";

import { useEffect, useState } from "react";
import logo from "../assets/logoforo.png";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export function Navigation() {
  const router = useRouter();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [word, setWord] = useState("");
  const [connected, setConnected] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const ruta = window.location.href;
    console.log(ruta, "ruitacautla");
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("user");
      const isConnected = storage && storage.length > 1;
      if (isConnected) {
        const parsedUserData = JSON.parse(storage);
        setUserData(parsedUserData.image);
      }
      setConnected(!!isConnected);
    }
  }, []);

  const logOut = async () => {
    await localStorage.removeItem("user");
    setConnected(false);
    setUserData("");
  };

  return (
    <nav className="bg-neutral-800 border-b-2 border-amber-500 justify-center p-4 flex items-center">
      <div className="flex items-center">
        <Link href="/post" as={`/post`} className="flex">
          <img
            src={logo.src}
            className="flex w-[180px] h-[40px] mr-4"
            alt="logo"
          />
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
            className="cursor-pointer text-white hover:text-amber-700 p-2 rounded"
          >
            Programacion
          </Link>
          <div
            onMouseLeave={() => setOpen1(false)}
            className={`${
              open1 ? "block" : "hidden"
            } bg-amber-400 absolute mt-2 p-2 shadow-md rounded`}
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
            className="cursor-pointer text-white hover:text-amber-700 p-2 rounded"
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
            className="cursor-pointer text-white hover:text-amber-700 p-2 rounded"
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
        <div className="flex flex-row bg-neutral-600 p-1 rounded">
          <input
            className="flex rounded text-white p-0.5 shadow-md bg-neutral-500"
            type="text"
            onChange={(e) => setWord(e.target.value)}
            name="title"
            placeholder="Buscar..."
          ></input>
          <Link
            href="/filter/:word"
            as={`/filter/${word}`}
            className="flex justify-center w-[20px]"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="input-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        {connected && (
          <div className="relative group">
            <Link
              href="/post/create"
              as={`/post/create`}
              className="cursor-pointer text-white hover:text-amber-700 p-2 rounded"
            >
              Crear Post
            </Link>
          </div>
        )}
        <div className="flex justify-center items-center flex-row">
          {!connected ? (
            <>
              <Link href="/signin" as={`/signin`} className="flex">
                <button className="flex justify-center items-center rounded-lg px-3 bg-yellow-600">
                  Ingresar
                </button>
              </Link>
              <Link href="/login" as={`/login`} className="flex">
                <button className="flex justify-center items-center rounded-lg px-3 text-yellow-600">
                  Registrarse
                </button>
              </Link>
            </>
          ) : (
            <div className="relative group">
              <div className="flex flex-row">
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
                    src={userData && userData}
                    className="flex border-2 border-amber-600 w-[40px] h-[40px]"
                  />
                </div>
              </div>
              <div
                onMouseLeave={() => setOpen3(false)}
                className={`${
                  open3 ? "block" : "hidden"
                } bg-amber-400 absolute mt-2 shadow-md rounded min-w-[80px] w-auto`}
              >
                <div className="flex flex-col items-center">
                  <Link
                    href="/perfil"
                    className="cursor-pointer text-black hover:text-white"
                  >
                    Perfil
                  </Link>
                  <button className="cursor-pointer text-black hover:text-white">
                    Muro
                  </button>
                  <button className="cursor-pointer text-black hover:text-white">
                    Post
                  </button>
                  <button
                    onClick={() => logOut()}
                    className="cursor-pointer text-black hover:text-white"
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
