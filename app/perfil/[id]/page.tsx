"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "@/utils/constants";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Perfil({ params }: any) {
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [localComment, setLocalComment] = useState<any>([]);
  const [commentsList, setCommentsList] = useState<any>([]);
  const [comment, setComment] = useState<any>({
    description: "",
    authorId: "",
    userName: "",
    image: "",
    createdAt: "",
  });
  const [active, setActive] = useState(true);
  const [post, setPost] = useState<any>([]);
  const [userData, setUserData] = useState<any>({
    userName: "",
    image: "",
    mail: "",
    createdAt: "",
    sex: "",
    fullName: "",
    profession: "",
    job: "",
    university: "",
    career: "",
    city: "",
    province: "",
    country: "",
  });

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item !== null) {
      const parsedUserData = JSON.parse(item);
      setUserData(parsedUserData);
      setComment({
        ...comment,
        authorId: parsedUserData.id.toString(),
        userName: parsedUserData.userName,
        image: parsedUserData.image,
      });
      console.log(comment, "com");
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
          setUserData(resp.data);
          setPost(resp.data.posts);
          setCommentsList(resp.data.perfilComments);
        }
      } catch (error) {
        setErrorMsg(true);
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [params]);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };

  const handleSendComment = async () => {
    try {
      const resp = await axios.post(
        `${URL}/user/comment/${params.id}`,
        comment
      );
      console.log(resp, "resp del server");
      setLocalComment((prevState: any) => [...prevState, comment]);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(commentsList, "postss");

  return (
    <div className="flex justify-center flex-row bg-gray-500 h-screen space-x-2">
      <div className="flex flex-col items-center w-[200px] h-[400px] bg-gray-600 shadow-lg border border-orange-600 my-2">
        <img
          className="flex items-center mt-2 max-w-[60px] max-h-[60px] rounded"
          src={userData.image}
        ></img>
        {userData.userName && (
          <h5 className="flex items-center font-semibold text-black">
            {userData.userName}
          </h5>
        )}
        <div className="flex flex-col justify-center ml-1 items-start">
          {userData.fullName && (
            <span>
              Nombre: <span className="font-semibold">{userData.fullName}</span>
            </span>
          )}
          {userData.profession && (
            <span>
              Profesión:{" "}
              <span className="font-semibold">{userData.profession}</span>
            </span>
          )}
          {userData.job && (
            <span>
              Trabajo: <span className="font-semibold">{userData.job}</span>
            </span>
          )}
          {userData.city && (
            <span>
              Ciudad: <span className="font-semibold">{userData.city}</span>
            </span>
          )}
          {userData.province && (
            <span>
              Provincia:{" "}
              <span className="font-semibold">{userData.province}</span>
            </span>
          )}
          {userData.country && (
            <span>
              País: <span className="font-semibold">{userData.country}</span>
            </span>
          )}
        </div>
        <h4 className="flex justify-end font-semibold">
          {userData.createdAt.slice(0, 10)}
        </h4>
      </div>
      <div className="flex flex-col w-[650px] h-auto min-h-screen bg-gray-600 shadow-lg border border-orange-600 my-2">
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
              Comentar Perfil
            </button>
          </div>
          {active ? (
            post.map((e: any) => {
              return (
                <div className="flex flex-row w-full h-[100px] bg-slate-600 border-2 border-gray-800">
                  <div className="flex w-auto ml-1 justify-center items-center">
                    {e.section}
                  </div>
                  <div className="flex w-[700px] justify-center flex-col items-start ml-4">
                    <Link href="/posts/id" as={`/post/${e.id}`}>
                      <h5 className="text-xl hover:text-orange-700">
                        {e.title}
                      </h5>
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
            })
          ) : (
            <div className="flex flex-col w-full h-full bg-slate-600 border-2 border-gray-800">
              {commentsList && commentsList.length >= 1 ? (
                commentsList.map((e: any) => {
                  return (
                    <div className="flex flex-row w-full h-auto bg-gray-600 border-2 border-gray-900">
                      <div className="flex flex-col justify-center items-center p-3">
                        <img className="flex w-[50px]" src={e.image}></img>
                        <h5 className="flex font-bold">{e.userName}</h5>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex w-full h-full bg-slate-500">
                          {e.description}
                        </div>
                        <div className="flex justify-end w-full h-[20px] bg-slate-700">
                          {e.createdAt.slice(0, 10)}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex w-auto h-20 ml-1 bg-slate-700 justify-center items-center">
                  Aún no hay comentarios en el perfil de {userData.userName}
                </div>
              )}
              {localComment && localComment.length >= 1
                ? localComment.map((e: any) => {
                    return (
                      <div className="flex flex-row w-full h-auto bg-gray-600 border-2 border-gray-900">
                        <div className="flex flex-col justify-center items-center p-3">
                          <img className="flex w-[50px]" src={e.image}></img>
                          <h5 className="flex font-bold">{e.userName}</h5>
                        </div>
                        <div className="flex w-full h-full bg-slate-500">
                          {e.description}
                        </div>
                      </div>
                    );
                  })
                : null}
              <div className="flex flex-row w-auto ml-1 justify-center items-center">
                <textarea
                  name="description"
                  onChange={(event) => handleTextAreaChange(event)}
                  className="flex w-full border border-orange-700 h-full bg-slate-500"
                ></textarea>
                <button
                  onClick={() => handleSendComment()}
                  className="flex justify-center items-center h-full w-[90px] bg-orange-700"
                >
                  Comentar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
