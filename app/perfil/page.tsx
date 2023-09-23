"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "@/utils/constants";
import { redirect } from "next/navigation";

export default function Perfil() {
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [postData, setpostData] = useState({
    title: "",
    image: [""],
    description: "",
    section: "",
    authorId: "",
  });

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item !== null) {
      const parsedUserData = JSON.parse(item);
      postData.authorId = parsedUserData.id;
    } else {
      console.log(
        "No se encontraron datos de usuario en el almacenamiento local"
      );
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setpostData({ ...postData, [name]: value });
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setpostData({ ...postData, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setpostData({ ...postData, [name]: value });
  };

  const handleVerification = async () => {
    const resp = await fetch(`${URL}/post`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await resp.json();
    console.log("?");
    console.log(jsonResponse);
    if (jsonResponse.status !== 404) {
      console.log("post creado con exito");
    } else {
      setErrorMsg(true);
    }
  };

  console.log(postData, "dat");

  return (
    <div className="flex justify-center flex-row bg-gray-500 h-screen space-x-2">
      <div className="flex flex-col items-center w-[200px] h-[400px] bg-gray-600 shadow-lg border border-orange-600 my-2"></div>
      <div className="flex flex-col w-[500px] h-auto min-h-screen bg-gray-600 shadow-lg border border-orange-600 my-2">
        <h6 className="flex justify-center items-center font-bold text-3xl text-black">
          Información Personal
        </h6>
        <div className="flex flex-col">
          <label className="flex text-xl ml-2 text-black underline font-semibold">
            Datos Personales
          </label>
          <div className="flex flex-col mx-4">
            <label className="flex text-lg font-semibold text-gray-800">
              Nombre
            </label>
            <input
              placeholder="Nombre completo"
              className="flex rounded shadow-md w-auto h-[30px] bg-slate-400 placeholder:text-black"
            ></input>
          </div>
          <div className="flex flex-col mx-4">
            <label className="flex text-lg font-semibold text-gray-800">
              Sexo
            </label>
            <select
              placeholder="Sexo"
              className="flex rounded shadow-md w-auto h-[30px] bg-slate-400 placeholder:text-black"
            >
              <option className="text-black">Masculino</option>
              <option className="text-black">Femenino</option>
            </select>
          </div>
          <div>
            <label className="flex text-xl ml-2 text-black underline font-semibold">
              Profesión
            </label>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-gray-800">
                Profesión
              </label>
              <input
                placeholder="Profesion"
                className="flex rounded shadow-md w-auto h-[30px] bg-slate-400 placeholder:text-black"
              ></input>
            </div>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-gray-800">
                Puesto Laboral
              </label>
              <input
                placeholder="Puesto laboral"
                className="flex rounded shadow-md w-auto h-[30px] bg-slate-400 placeholder:text-black"
              ></input>
            </div>
          </div>
          <div>
            <label className="flex text-xl ml-2 text-black underline font-semibold">
              Estudios
            </label>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-gray-800">
                Universidad/BoothCamp
              </label>
              <input
                placeholder="Universidad"
                className="flex rounded shadow-md w-auto h-[30px] bg-slate-400 placeholder:text-black"
              ></input>
            </div>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-gray-800">
                Carrera
              </label>
              <input
                placeholder="Carrera"
                className="flex rounded shadow-md w-auto h-[30px] bg-slate-400 placeholder:text-black"
              ></input>
            </div>
          </div>
          <div>
            <label className="flex text-xl ml-2 text-black underline font-semibold">
              Ubicacion
            </label>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-gray-800">
                Ciudad
              </label>
              <input
                placeholder="Ciudad"
                className="flex rounded shadow-md w-auto h-[30px] bg-slate-400 placeholder:text-black"
              ></input>
            </div>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-gray-800">
                Provincia
              </label>
              <input
                placeholder="Provincia"
                className="flex rounded shadow-md w-auto h-[30px] bg-slate-400 placeholder:text-black"
              ></input>
            </div>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-gray-800">
                País
              </label>
              <input
                placeholder="País"
                className="flex rounded shadow-md w-auto h-[30px] bg-slate-400 placeholder:text-black"
              ></input>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end mr-2 mt-2">
          <button className="rounded w-[150px] text-black font-semibold bg-slate-700 h-auto p-2 border-2 border-orange-700">
            Actualizar Información
          </button>
        </div>
      </div>
    </div>
  );
}
