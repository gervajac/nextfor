"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "@/utils/constants";
import { redirect } from "next/navigation";

export default function CreatePost() {
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
      redirect("/post");
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
    console.log(jsonResponse, "respppp");
    if (jsonResponse.status !== 404) {
      console.log("post creado con exito");
    } else {
      setErrorMsg(true);
    }
  };

  console.log(postData, "dat");

  return (
    <div className="flex justify-center bg-neutral-500 h-screen">
      <div className="flex flex-col mx-2 h-[800px] w-[700px] bg-neutral-600 shadow-xl rounded mt-4">
        <div className="flex justify-start pl-2 text-2xl border-b-4 border-amber-700 items-center h-[100px] bg-neutral-700 rounded">
          Crear posteo
        </div>
        <div className="flex items-start flex-col text-black mx-2">
          <label className="font-semibold text-xl mt-4">Tema</label>
          <select
            name="section"
            value={postData.section}
            onChange={(e) => handleSelectChange(e)}
            defaultValue="Seleccionar tema"
            className="flex items-center h-10 px-4 w-64 bg-neutral-400 placeholder:text-black mt-2 rounded focus:outline-none focus:ring-2"
          >
            <option className="text-neutral-300">Seleccionar tema</option>
            <option>Programacion</option>
            <option>Empleos</option>
            <option>Educacion</option>
          </select>
          <label className="flex justify-start font-semibold text-xl mt-4">
            Titulo
          </label>
          <input
            className="flex items-center h-10 px-4 w-64 bg-neutral-400 placeholder:text-black mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
            name="title"
            value={postData.title}
            onChange={(e) => handleInputChange(e)}
            placeholder="Titulo del posteo"
          />
          <label className="font-semibold text-xl mt-4">Descripcion</label>
          <textarea
            className="flex items-center min-w-full min-h-[100px] p-2 placeholder:text-black text-black bg-neutral-400 h-10 px-4 w-full mt-2 rounded focus:outline-none focus:ring-2"
            name="description"
            value={postData.description}
            onChange={(e) => handleTextAreaChange(e)}
            placeholder="Descripcion del post"
          />
          {errorMsg ? (
            <h4 className="text-red-500">Credenciales invalidas</h4>
          ) : null}
          <button
            onClick={() => handleVerification()}
            type="button"
            className="h-auto w-auto p-3 inline-block m-2 rounded-lg border border-amber-700 bg-neutral-700 text-sm font-medium text-white"
          >
            Publicar posteo
          </button>
        </div>
      </div>
    </div>
  );
}
