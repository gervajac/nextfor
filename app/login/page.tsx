"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "@/utils/constants";
import { redirect } from "next/navigation";

export default function Login() {
  const [successMsg, setSuccessMsg] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [userData, setUserData] = useState({
    userName: "",
    image:
      "https://toppng.com/uploads/preview/vu-thi-ha-user-pro-icon-115534024853ae3gswzwd.png",
    mail: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleVerification = async () => {
    if (!userData.userName || !userData.mail || !userData.password) {
      setEmptyData(true);
    } else {
      const resp = await fetch(`${URL}/user`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status === 500) {
        setSuccessMsg(true);
      } else {
        window.location.href = "/signin";
      }
    }
  };

  return (
    <div className="flex justify-center bg-neutral-700 h-screen">
      <div className="flex flex-col h-auto max-h-[700px] w-[500px] bg-neutral-600 shadow-xl rounded mt-4">
        <div className="flex justify-center text-2xl border-b-4 border-amber-700 items-center h-[100px] bg-neutral-600 rounded">
          Registro de usuario
        </div>
        <form className="flex items-center flex-col text-black">
          <label className="font-semibold text-xs mt-4">Username</label>
          <input
            className="flex items-center h-10 px-4 w-64 bg-neutral-300 mt-2 rounded focus:outline-none focus:ring-2"
            type="name"
            name="userName"
            value={userData.userName}
            onChange={(e) => handleInputChange(e)}
            placeholder="Username"
          />
          <label className="font-semibold text-xs pt-2">Email</label>
          <input
            className="flex items-center h-10 px-4 w-64 bg-neutral-300 mt-2 rounded focus:outline-none focus:ring-2"
            type="email"
            name="mail"
            value={userData.mail}
            onChange={(e) => handleInputChange(e)}
            placeholder="E-mail"
          />
          <label className="font-semibold text-xs mt-1">Nueva Contraseña</label>
          <input
            className="flex items-center h-10 px-4 w-64 bg-neutral-300 mt-2 rounded focus:outline-none focus:ring-2"
            type="password"
            name="password"
            value={userData.password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Contraseña"
          />
          {successMsg && (
            <h6 className="flex justify-center text-red-500 font-bold">
              Usuario o Email ya registrados.
            </h6>
          )}
          {emptyData && (
            <h6 className="flex justify-center text-red-500 font-bold">
              Completa todos los campos.
            </h6>
          )}
          <button
            onClick={() => handleVerification()}
            type="button"
            className="h-auto w-auto p-3 inline-block m-2 rounded-lg bg-amber-600 text-sm font-medium text-white"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
