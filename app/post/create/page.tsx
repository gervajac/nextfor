"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "@/utils/constants";
import { redirect } from "next/navigation";
import { uploadFile } from "@/app/config/config";

export default function CreatePost() {
  const [successMsg, setSuccessMsg] = useState(false);
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [postData, setpostData] = useState({
    title: "",
    image: "",
    description: "",
    section: "",
    authorId: "",
  });

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item !== null) {
      const parsedUserData = JSON.parse(item);
      postData.authorId = parsedUserData.id;
      setToken(parsedUserData.token);
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
    if (postData.description && postData.title && postData.section) {
      const resp = await axios.post(`${URL}/post`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = resp.data;
      console.log(jsonResponse, "respppp");
      if (jsonResponse.status !== 404) {
        alert("post creado con exito");
      } else {
        setErrorMsg(true);
        alert("hubo un error en la creacion");
      }
    } else {
      alert("Los campos Tema, Titulo y Descripcion son obligatorios.");
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name } = event.target;
    const file = event.target.files && event.target.files[0];
    try {
      if (file) {
        const result = await uploadFile(file);
        const reader = new FileReader();
        setpostData({ ...postData, image: result });
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  console.log(postData, "postdadtaaaa");
  return (
    <div className="flex justify-center bg-neutral-500 h-screen">
      <div className="flex flex-col mx-2 h-[800px] w-[700px] bg-neutral-600 shadow-xl rounded mt-4">
        <div className="flex justify-start pl-2 text-2xl border-b-4 border-amber-700 items-center h-[100px] bg-neutral-700 rounded">
          Crear posteo
        </div>
        <div className="flex flex-col text-black mx-2">
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
          <label className="flex justify-start items-center font-semibold text-xl mt-4">
            Titulo{" "}
            <span className="flex justify-center items-center text-sm">
              (50Max.)
            </span>
          </label>
          <input
            className="flex items-center h-10 px-4 w-auto bg-neutral-400 placeholder:text-black mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
            name="title"
            value={postData.title}
            onChange={(e) => handleInputChange(e)}
            placeholder="Titulo del posteo"
            maxLength={50}
          />
          <label className="flex flex-row font-semibold text-xl mt-4">
            Descripción
            <span className="flex justify-center items-center text-sm">
              (500Max.)
            </span>
          </label>
          <textarea
            className="flex items-center min-w-full min-h-[100px] p-2 placeholder:text-black text-black bg-neutral-400 h-10 px-4 w-full mt-2 rounded focus:outline-none focus:ring-2"
            name="description"
            value={postData.description}
            onChange={(e) => handleTextAreaChange(e)}
            placeholder="Descripcion del post"
            maxLength={500}
          />
          <label className="font-semibold text-xl mt-4">Agregar imagen</label>
          <input
            className="hidden"
            type="file"
            name="image"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handleImageChange(e)}
            id="fileInput"
            placeholder="Sube tu foto de perfil"
          />
          <div className="relative">
            <div className="flex flex-row space-x-4">
              <label
                htmlFor="fileInput"
                className="text-black p-2 h-[40px] w-[120px] bg-amber-600 font-semibold my-2 rounded cursor-pointer"
              >
                Elegir imagen
              </label>
              {postData.image && (
                <div className="relative">
                  <img
                    className="flex w-auto max-w-[400px] h-auto max-h-[300px]"
                    src={postData.image}
                    alt="Imagen subida"
                  />
                  <button
                    onClick={() =>
                      setpostData((prevData) => ({ ...prevData, image: "" }))
                    }
                    className="absolute border border-amber-700 top-0 right-0 backdrop-blur-sm p-1 text-black rounded"
                  >
                    Quitar
                  </button>
                </div>
              )}
            </div>
          </div>
          {errorMsg ? (
            <h4 className="text-red-500">Credenciales invalidas</h4>
          ) : null}
          <div className="flex justify-end">
            <button
              onClick={() => handleVerification()}
              type="button"
              className="flex justify-center text-xl h-auto w-[160px] p-3 m-2 rounded-lg border hover:bg-amber-700 border-amber-700 bg-neutral-700 font-medium text-white"
            >
              Publicar Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
