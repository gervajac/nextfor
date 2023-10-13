"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "@/utils/constants";
import { redirect } from "next/navigation";
import { uploadFile } from "../config/config";

export default function Perfil() {
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    image: "",
    mail: "",
    password: "",
    createdAt: "",
    sex: "",
    fullName: "",
    profession: "",
    job: "",
    university: "",
    career: "",
    token: "",
    city: "",
    province: "",
    country: "",
  });
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
      setUserData(parsedUserData);
    } else {
      console.log(
        "No se encontraron datos de usuario en el almacenamiento local"
      );
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleVerification = async () => {
    console.log(userData, "userdatanates");
    const resp = await axios.patch(
      `${URL}/user/${postData.authorId}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );

    if (resp.status !== 404) {
      alert("Usuario actualizado");
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      setErrorMsg(true);
      console.log("error");
    }
  };
  const avatarList = [
    "https://img2.freepng.es/20180410/rze/kisspng-ninja-computer-programming-learning-study-skills-avatar-5acd61df554968.2443493915234093753493.jpg",
    "https://yt3.googleusercontent.com/1SFBG2eSQQbPSqyUkfHQCYO0y34qpWlKh2fVwsXv_vaa0dwLStb9YoqQFEs348INFKRcJ5DoQEw=s900-c-k-c0x00ffffff-no-rj",
    "https://avatars.githubusercontent.com/u/54087641?v=4",
    "https://edteam-media.s3.amazonaws.com/users/avatar/4ee40616-0e57-40a0-96fc-8d5f7c56991b.png",
    "https://previews.123rf.com/images/yupiramos/yupiramos1710/yupiramos171009847/87760314-chica-de-dibujos-animados-con-la-ilustraci%C3%B3n-de-vector-de-trabajo-de-programaci%C3%B3n-port%C3%A1til.jpg",
  ];

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name } = event.target;
    const file = event.target.files && event.target.files[0];
    try {
      if (file) {
        const result = await uploadFile(file);
        const reader = new FileReader();
        setUserData({ ...userData, image: result });
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  console.log(userData, "dat");

  return (
    <div className="flex justify-center flex-row bg-neutral-500 h-auto space-x-2">
      <div className="flex flex-col items-center w-[200px] h-[400px] bg-neutral-600 shadow-lg border border-amber-600 my-2">
        <img
          className="flex items-center mt-2 h-[60px] w-[60px] rounded"
          src={userData.image}
        ></img>
        <h5 className="flex items-center font-semibold text-black">
          {userData.userName}
        </h5>
        <h4>{userData.createdAt.slice(0, 10)}</h4>
      </div>
      <div className="flex flex-col w-[500px] h-auto min-h-screen bg-neutral-600 shadow-lg border border-amber-600 my-2">
        <h6 className="flex justify-center items-center font-bold text-3xl text-black">
          Información Personal
        </h6>
        <div className="flex flex-col">
          <label className="flex text-xl ml-2 mb-2 text-black underline font-semibold">
            Avatar
          </label>
          <div className="flex flex-row justify-center space-x-4 ml-4">
            {avatarList &&
              avatarList.map((e, index) => {
                return (
                  <button
                    key={index}
                    onClick={() =>
                      setUserData((prevState) => ({ ...prevState, image: e }))
                    }
                  >
                    <img
                      className={
                        e === userData.image
                          ? "flex max-w-[60px] border-2 border-amber-700"
                          : "flex max-w-[60px]"
                      }
                      key={index}
                      src={e}
                      alt={`Avatar ${index}`}
                    />
                  </button>
                );
              })}
          </div>
          <div className="flex justify-center flex-row space-x-4">
            <input
              className="hidden"
              type="file"
              name="image"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handleImageChange(e)}
              id="fileInput"
              placeholder="Sube tu foto de perfil"
            />
            <label
              htmlFor="fileInput"
              className="flex justify-center text-black p-2 h-[40px] w-auto bg-amber-600 font-semibold my-2 rounded cursor-pointer"
            >
              Elegir mi propia imagen
            </label>
          </div>
          <label className="flex text-xl ml-2 text-black underline font-semibold">
            Datos Personales
          </label>
          <div className="flex flex-col mx-4">
            <label className="flex text-lg font-semibold text-neutral-800">
              Nombre
            </label>
            <input
              name="fullName"
              onChange={(e) => handleInputChange(e)}
              value={userData.fullName && userData.fullName}
              placeholder="Nombre completo"
              className="flex rounded shadow-md w-auto h-[30px] bg-neutral-400 placeholder:text-black"
            ></input>
          </div>
          <div className="flex flex-col mx-4">
            <label className="flex text-lg font-semibold text-neutral-800">
              Sexo
            </label>
            <select
              name="sex"
              onChange={(e) => handleSelectChange(e)}
              placeholder="Sexo"
              value={userData.sex && userData.sex}
              className="flex rounded shadow-md w-auto h-[30px] bg-neutral-400 placeholder:text-black"
            >
              <option disabled className="text-black">
                Sex
              </option>
              <option value="Masculino" className="text-black">
                Masculino
              </option>
              <option value="Femenino" className="text-black">
                Femenino
              </option>
            </select>
          </div>
          <div>
            <label className="flex text-xl ml-2 text-black underline font-semibold">
              Profesión
            </label>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-neutral-800">
                Profesión
              </label>
              <input
                name="profession"
                value={userData.profession && userData.profession}
                onChange={(e) => handleInputChange(e)}
                placeholder="Profesion"
                className="flex rounded shadow-md w-auto h-[30px] bg-neutral-400 placeholder:text-black"
              ></input>
            </div>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-neutral-800">
                Puesto Laboral
              </label>
              <input
                name="job"
                onChange={(e) => handleInputChange(e)}
                value={userData.job && userData.job}
                placeholder="Puesto laboral"
                className="flex rounded shadow-md w-auto h-[30px] bg-neutral-400 placeholder:text-black"
              ></input>
            </div>
          </div>
          <div>
            <label className="flex text-xl ml-2 text-black underline font-semibold">
              Estudios
            </label>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-neutral-800">
                Universidad/BoothCamp
              </label>
              <input
                name="university"
                onChange={(e) => handleInputChange(e)}
                placeholder="Universidad"
                value={userData.university && userData.university}
                className="flex rounded shadow-md w-auto h-[30px] bg-neutral-400 placeholder:text-black"
              ></input>
            </div>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-neutral-800">
                Carrera
              </label>
              <input
                name="career"
                onChange={(e) => handleInputChange(e)}
                placeholder="Carrera"
                value={userData.career && userData.career}
                className="flex rounded shadow-md w-auto h-[30px] bg-neutral-400 placeholder:text-black"
              ></input>
            </div>
          </div>
          <div>
            <label className="flex text-xl ml-2 text-black underline font-semibold">
              Ubicacion
            </label>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-neutral-800">
                Ciudad
              </label>
              <input
                name="city"
                onChange={(e) => handleInputChange(e)}
                placeholder="Ciudad"
                value={userData.city && userData.city}
                className="flex rounded shadow-md w-auto h-[30px] bg-neutral-400 placeholder:text-black"
              ></input>
            </div>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-neutral-800">
                Provincia
              </label>
              <input
                name="province"
                onChange={(e) => handleInputChange(e)}
                placeholder="Provincia"
                value={userData.province && userData.province}
                className="flex rounded shadow-md w-auto h-[30px] bg-neutral-400 placeholder:text-black"
              ></input>
            </div>
            <div className="flex flex-col mx-4">
              <label className="flex text-lg font-semibold text-neutral-800">
                País
              </label>
              <input
                name="country"
                onChange={(e) => handleInputChange(e)}
                placeholder="País"
                value={userData.country && userData.country}
                className="flex rounded shadow-md w-auto h-[30px] bg-neutral-400 placeholder:text-black"
              ></input>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end mr-2 mt-2">
          <button
            onClick={() => handleVerification()}
            className="rounded w-[150px] text-black font-semibold bg-neutral-700 h-auto p-2 border-2 border-amber-700"
          >
            Actualizar Información
          </button>
        </div>
      </div>
    </div>
  );
}
