"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "@/utils/constants";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Perfil({ params }: any) {
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [active, setActive] = useState(true);
  const [post, setPost] = useState<any>([]);
  const [userData, setUserData] = useState<any>({
    userName: "",
    image: "",
    mail: "",
    password: "",
    createdAt: "",
  });

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item !== null) {
      const parsedUserData = JSON.parse(item);
      setUserData(parsedUserData);
    } else {
      console.log(
        "No se encontraron datos de usuario en el almacenamiento local"
      );
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resp = await axios.get(`${URL}/user/${params.id}`);
        console.log(resp, "reppp");
        if (resp.data.status === 404) {
          console.log("usuaruio no encontrado");
        } else {
          setUserData({
            userName: resp.data.userName,
            image: resp.data.image,
            createdAt: resp.data.createdAt,
          });
          setPost(resp.data.posts);
        }
      } catch (error) {
        setErrorMsg(true);
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [params]);

  console.log(post, "postss");
  return (
    <div className="flex justify-center flex-row bg-gray-500 h-screen space-x-2">
      <div className="flex flex-col items-center w-[200px] h-[400px] bg-gray-600 shadow-lg border border-orange-600 my-2">
        <img
          className="flex items-center mt-2 max-w-[60px] max-h-[60px] rounded"
          src={userData.image}
        ></img>
        <h5 className="flex items-center font-semibold text-black">
          {userData.userName}
        </h5>
        <h4>{userData.createdAt.slice(0, 10)}</h4>
      </div>
      <div className="flex flex-col w-[500px] h-auto min-h-screen bg-gray-600 shadow-lg border border-orange-600 my-2">
        <div className="flex justify-start items-center flex-col bg-gray-700 w-full h-full">
          <div className="flex flex-row justify-around space-x-2 w-full h-[40px] bg-slate-600 border-2 border-gray-800">
            <button
              onClick={() => setActive(true)}
              className={
                active
                  ? "flex justify-center items-center font-semibold w-full bg-slate-800"
                  : "flex w-full justify-center items-center"
              }
            >
              Posteos
            </button>
            <button
              onClick={() => setActive(false)}
              className={
                !active
                  ? "flex justify-center items-center font-semibold w-full bg-slate-800"
                  : "flex w-full justify-center items-center"
              }
            >
              Información Personal
            </button>
          </div>
          {post.map((e: any) => {
            return (
              <div className="flex flex-row w-full h-[100px] bg-slate-600 border-2 border-gray-800">
                <div className="flex w-auto ml-1 justify-center items-center">
                  {e.section}
                </div>
                <div className="flex w-[700px] justify-center flex-col items-start ml-4">
                  <Link href="/posts/id" as={`/post/${e.id}`}>
                    <h5 className="text-xl hover:text-orange-700">{e.title}</h5>
                  </Link>
                  <h2 className="flex flex-row justify-start items-start text-orange-500">
                    <span className="flex text-orange-700">
                      {userData.userName}
                    </span>
                    <span className="flex text-white">
                      {e.createdAt.slice(0, 10)}
                    </span>
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
