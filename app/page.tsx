import { URL } from "@/utils/constants";
import Link from "next/link";
import axios from "axios";
import { Ranking } from "./components/Ranking";

const fetchPost = async () => {
  try {
    const resp = await axios.get(`${URL}/post`);
    return resp;
  } catch (err) {
    console.log(err, "que es este error?");
  }
};

export default async function Home() {
  const posts = await fetchPost();
  const data = posts?.data;
  console.log(data, "Datasio no?")
  return (
    <section className="flex justify-center items-start min-h-screen h-[2000px] w-full bg-neutral-800">
      <div className="flex flex-col min-w-[900px] min-h-screen bg-neutral-700">
        {/* <Ranking /> */}
        <div className="flex justify-center flex-row space-x-1">
          <div className="flex flex-col max-w-[250px]">
            <h6 className="flex justify-center font-bold text-2xl text-amber-700">
              Nuevos Post
            </h6>
            {data.post.length >= 1 ? (
              data.post.map((e: any) => {
                return (
                  <div
                    key={e.id}
                    className="flex flex-col my-0.5 bg-neutral-700 border border-neutral-600 shadow-2xl p-1"
                  >
                    <Link
                      href="/post/id"
                      as={`/post/${e.id}`}
                      className="flex justify-center text-amber-500 text-xl  hover:text-amber-600 bg-neutral-600 p-1"
                    >
                      {e.title}
                    </Link>
                    <h1 className="flex text-sm justify-center items-center my-4 p-1">
                      {e.description.slice(0, 200)}
                    </h1>
                    <img
                      className="flex justify-center mb-1 max-w-full h-auto max-h-[300px]"
                      src={e.image && e.image}
                      alt={e.image}
                    ></img>
                    <div className="flex items-center flex-row w-full bg-neutral-600 space-x-1">
                      <img
                        src={e.author.image}
                        className="flex w-[40px] h-[40px]"
                      ></img>
                      <Link
                        href="/perfil/id"
                        as={`/perfil/${e.author.id}`}
                        className="flex text-amber-600 items-center"
                      >
                        {" "}
                        {e.author.userName}
                      </Link>
                      <div className="flex flex-row justify-center items-center">
                        <svg
                          viewBox="0 0 20 20"
                          width="20"
                          height="20"
                          fill="orange"
                        >
                          <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                        </svg>
                        <h4>{e.likesCount}</h4>
                      </div>
                      <div className="flex flex-row justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="orange"
                        >
                          <path d="M17,9H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm-4,4H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z" />
                        </svg>
                        <h4>{e.comments.length}</h4>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col my-0.5 bg-neutral-700 border border-t-2 border-t-blue-600 border-neutral-600 shadow-2xl p-1">
                <h4 className="flex justify-center text-xl  text-amber-500 hover:text-amber-600 bg-neutral-600 p-1">
                  Aun no hay Post, crea tu primer Post
                </h4>
                <h1 className="flex text-sm justify-center items-center my-4 p-1">
                  Se el primero en crear un Post sobre Programacion, Educacion o
                  Empleos!
                </h1>
                <div className="flex items-center flex-row w-full bg-neutral-600 space-x-2">
                  <h4 className="flex text-amber-600 items-center"></h4>
                  <div className="flex flex-row justify-center items-center">
                    <svg
                      viewBox="0 0 20 20"
                      width="20"
                      height="20"
                      fill="orange"
                    >
                      <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                    </svg>
                    <h4>0</h4>
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="orange"
                    >
                      <path d="M17,9H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm-4,4H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z" />
                    </svg>
                    <h4>0</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col max-w-[250px]">
            <h6 className="flex justify-center font-bold  text-2xl text-amber-700">
              Programacion
            </h6>
            {data.programacion.length >= 1 ? (
              data.programacion.map((e: any) => {
                return (
                  <div
                    key={e.id}
                    className="flex flex-col my-0.5 bg-neutral-700 border border-neutral-600 border-t-2 border-t-green-600 shadow-2xl p-1"
                  >
                    <Link
                      href="/post/id"
                      as={`/post/${e.id}`}
                      className="flex justify-center text-xl  text-amber-500 hover:text-amber-600 bg-neutral-600 p-1"
                    >
                      {e.title}
                    </Link>
                    <h1 className="flex text-sm justify-center items-center my-4 p-1">
                      {e.description.slice(0, 200)}
                    </h1>
                    <img
                      className="flex justify-center mb-1 max-w-full h-auto max-h-[300px]"
                      src={e.image && e.image}
                      alt={e.image}
                    ></img>
                    <div className="flex items-center flex-row w-full bg-neutral-600 space-x-1">
                      <img
                        src={e.author.image}
                        className="flex w-[40px] h-[40px]"
                      ></img>
                      <Link
                        href="/perfil/id"
                        as={`/perfil/${e.author.id}`}
                        className="flex text-amber-600 items-center"
                      >
                        {" "}
                        {e.author.userName}
                      </Link>
                      <div className="flex flex-row justify-center items-center">
                        <svg
                          viewBox="0 0 20 20"
                          width="20"
                          height="20"
                          fill="orange"
                        >
                          <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                        </svg>
                        <h4>{e.likesCount}</h4>
                      </div>
                      <div className="flex flex-row justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="orange"
                        >
                          <path d="M17,9H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm-4,4H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z" />
                        </svg>
                        <h4>{e.comments.length}</h4>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col my-0.5 bg-neutral-700 border border-t-2 border-t-blue-600 border-neutral-600 shadow-2xl p-1">
                <h4 className="flex justify-center text-xl  text-amber-500 hover:text-amber-600 bg-neutral-600 p-1">
                  Aun no hay Post de Programacion
                </h4>
                <h1 className="flex text-sm justify-center items-center my-4 p-1">
                  Se el primero en crear un Post sobre Programacion
                </h1>
                <div className="flex items-center flex-row w-full bg-neutral-600 space-x-2">
                  <h4 className="flex text-amber-600 items-center"></h4>
                  <div className="flex flex-row justify-center items-center">
                    <svg
                      viewBox="0 0 20 20"
                      width="20"
                      height="20"
                      fill="orange"
                    >
                      <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                    </svg>
                    <h4>0</h4>
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="orange"
                    >
                      <path d="M17,9H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm-4,4H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z" />
                    </svg>
                    <h4>0</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col max-w-[250px]">
            <h6 className="flex justify-center font-bold text-2xl text-amber-700">
              Empleos
            </h6>
            {data.empleos.length >= 1 ? (
              data.empleos.map((e: any) => {
                return (
                  <div
                    key={e.id}
                    className="flex flex-col my-0.5 bg-neutral-700 border border-t-2 border-t-blue-600 border-neutral-600 shadow-2xl p-1"
                  >
                    <Link
                      href="/post/id"
                      as={`/post/${e.id}`}
                      className="flex justify-center text-xl  text-amber-500 hover:text-amber-600 bg-neutral-600 p-1"
                    >
                      {e.title}
                    </Link>
                    <h1 className="flex text-sm justify-center items-center my-4 p-1">
                      {e.description.slice(0, 200)}
                    </h1>
                    <img
                      className="flex justify-center mb-1 max-w-full h-auto max-h-[300px]"
                      src={e.image && e.image}
                      alt={e.image}
                    ></img>
                    <div className="flex items-center flex-row w-full bg-neutral-600 space-x-2">
                      <img
                        src={e.author.image}
                        className="flex w-[40px] h-[40px]"
                      ></img>
                      <Link
                        href="/perfil/id"
                        as={`/perfil/${e.author.id}`}
                        className="flex text-amber-600 items-center"
                      >
                        {" "}
                        {e.author.userName}
                      </Link>
                      <div className="flex flex-row justify-center items-center">
                        <svg
                          viewBox="0 0 20 20"
                          width="20"
                          height="20"
                          fill="orange"
                        >
                          <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                        </svg>
                        <h4>{e.likesCount}</h4>
                      </div>
                      <div className="flex flex-row justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="orange"
                        >
                          <path d="M17,9H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm-4,4H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z" />
                        </svg>
                        <h4>{e.comments.length}</h4>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col my-0.5 bg-neutral-700 border border-t-2 border-t-blue-600 border-neutral-600 shadow-2xl p-1">
                <h4 className="flex justify-center text-xl  text-amber-500 hover:text-amber-600 bg-neutral-600 p-1">
                  Aun no hay Post de Empleos
                </h4>
                <h1 className="flex text-sm justify-center items-center my-4 p-1">
                  Se el primero en crear un Post sobre Empleos
                </h1>
                <div className="flex items-center flex-row w-full bg-neutral-600 space-x-2">
                  <h4 className="flex text-amber-600 items-center"></h4>
                  <div className="flex flex-row justify-center items-center">
                    <svg
                      viewBox="0 0 20 20"
                      width="20"
                      height="20"
                      fill="orange"
                    >
                      <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                    </svg>
                    <h4>0</h4>
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="orange"
                    >
                      <path d="M17,9H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm-4,4H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z" />
                    </svg>
                    <h4>0</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col max-w-[250px]">
            <h6 className="flex justify-center font-bold text-2xl text-amber-700">
              Cursos/Educacion
            </h6>
            {data.educacion.length >= 1 ? (
              data.educacion.map((e: any) => {
                return (
                  <div
                    key={e.id}
                    className="flex flex-col bg-neutral-700 my-0.5 border border-t-2 border-t-yellow-600 border-neutral-600 shadow-2xl p-1"
                  >
                    <Link
                      href="/post/id"
                      as={`/post/${e.id}`}
                      className="flex justify-center text-xl text-amber-500  hover:text-amber-600 bg-neutral-600 p-1"
                    >
                      {e.title}
                    </Link>
                    <h1 className="flex text-sm justify-center items-center my-4 p-1">
                      {e.description.slice(0, 200)}
                    </h1>
                    <img
                      className="flex justify-center mb-1 max-w-full h-auto max-h-[300px]"
                      src={e.image && e.image}
                      alt={e.image}
                    ></img>
                    <div className="flex items-center flex-row w-full bg-neutral-600 space-x-1">
                      <img
                        src={e.author.image}
                        className="flex w-[40px] h-[40px]"
                      ></img>
                      <Link
                        href="/perfil/id"
                        as={`/perfil/${e.author.id}`}
                        className="flex text-amber-600 items-center"
                      >
                        {" "}
                        {e.author.userName}
                      </Link>
                      <div className="flex flex-row justify-center items-center">
                        <svg
                          viewBox="0 0 20 20"
                          width="20"
                          height="20"
                          fill="orange"
                        >
                          <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                        </svg>
                        <h4>{e.likesCount}</h4>
                      </div>
                      <div className="flex flex-row justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="orange"
                        >
                          <path d="M17,9H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm-4,4H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z" />
                        </svg>
                        <h4>{e.comments.length}</h4>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col my-0.5 bg-neutral-700 border border-t-2 border-t-blue-600 border-neutral-600 shadow-2xl p-1">
                <h4 className="flex justify-center text-xl  text-amber-500 hover:text-amber-600 bg-neutral-600 p-1">
                  Aun no hay Post de Educacion
                </h4>
                <h1 className="flex text-sm justify-center items-center my-4 p-1">
                  Se el primero en crear un Post sobre Educacion
                </h1>
                <div className="flex items-center flex-row w-full bg-neutral-600 space-x-2">
                  <h4 className="flex text-amber-600 items-center"></h4>
                  <div className="flex flex-row justify-center items-center">
                    <svg
                      viewBox="0 0 20 20"
                      width="20"
                      height="20"
                      fill="orange"
                    >
                      <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                    </svg>
                    <h4>0</h4>
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="orange"
                    >
                      <path d="M17,9H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm-4,4H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z" />
                    </svg>
                    <h4>0</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
