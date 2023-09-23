import { URL } from "@/utils/constants";
import Link from "next/link";
import axios from "axios";

const fetchPost = async () => {
  try {
    const resp = await axios.get(`${URL}/post`);
    return resp;
  } catch (err) {
    console.log(err);
  }
};

export async function ListOfPosts() {
  const posts = await fetchPost();
  console.log(posts.data, "ppppp");
  return (
    <div className="flex flex-row">
      <div className="flex flex-col max-w-[250px]">
        <h6 className="flex justify-center font-bold text-2xl text-orange-700">
          Nuevos Post
        </h6>
        {posts.data.post.map((e) => {
          return (
            <div className="flex flex-col bg-gray-700 border border-gray-600 shadow-2xl p-1">
              <Link href="/posts/id" as={`/post/${e.id}`}>
                <h3 className="flex justify-center text-xl underline hover:text-orange-500 bg-slate-500 p-1">
                  {e.title}
                </h3>
                <h1 className="flex text-sm justify-center items-center my-4 p-1">
                  {e.description}
                </h1>
                <h2 className="mt-auto flex bg-slate-500 space-x-2">
                  <img
                    src={e.author.image}
                    className="flex max-w-[40px] max-h-[40px] mx-2"
                  ></img>
                  Creador{" "}
                  <span className="flex text-orange-600">
                    {" "}
                    {e.author.userName}
                  </span>
                </h2>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col max-w-[250px]">
        <h6 className="flex justify-center font-bold text-2xl text-orange-700">
          Programacion
        </h6>
        {posts.data.programacion.map((e) => {
          return (
            <div className="flex flex-col bg-gray-700 border border-gray-600 border-t-2 border-t-green-600 shadow-2xl p-1">
              <Link href="/posts/id" as={`/post/${e.id}`}>
                <h3 className="flex justify-center text-xl underline hover:text-orange-500 bg-slate-500 p-1">
                  {e.title}
                </h3>
                <h1 className="flex text-sm justify-center items-center my-4 p-1">
                  {e.description}
                </h1>
                <h2 className="mt-auto flex bg-slate-500 space-x-2">
                  <img
                    src={e.author.image}
                    className="flex max-w-[40px] max-h-[40px] mx-2"
                  ></img>
                  Creador{" "}
                  <span className="flex text-orange-600">
                    {" "}
                    {e.author.userName}
                  </span>
                </h2>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col max-w-[250px]">
        <h6 className="flex justify-center font-bold text-2xl text-orange-700">
          Empleos
        </h6>
        {posts.data.empleos.map((e) => {
          return (
            <div className="flex flex-col bg-gray-700 border border-t-2 border-t-blue-600 border-gray-600 shadow-2xl p-1">
              <Link href="/posts/id" as={`/post/${e.id}`}>
                <h3 className="flex justify-center text-xl underline hover:text-orange-500 bg-slate-500 p-1">
                  {e.title}
                </h3>
                <h1 className="flex text-sm justify-center items-center my-4 p-1">
                  {e.description}
                </h1>
                <h2 className="mt-auto flex bg-slate-500 space-x-2">
                  <img
                    src={e.author.image}
                    className="flex max-w-[40px] max-h-[40px] mx-2"
                  ></img>
                  Creador{" "}
                  <span className="flex text-orange-600">
                    {" "}
                    {e.author.userName}
                  </span>
                </h2>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col max-w-[250px]">
        <h6 className="flex justify-center font-bold text-2xl text-orange-700">
          Cursos/Educacion
        </h6>
        {posts.data.educacion.map((e) => {
          return (
            <div className="flex flex-col bg-gray-700 border border-t-2 border-t-yellow-500 border-gray-600 shadow-2xl p-1">
              <Link href="/posts/id" as={`/post/${e.id}`}>
                <h3 className="flex justify-center text-xl underline hover:text-orange-500 bg-slate-500 p-1">
                  {e.title}
                </h3>
                <h1 className="flex text-sm justify-center items-center my-4 p-1">
                  {e.description}
                </h1>
                <h2 className="mt-auto flex bg-slate-500 space-x-2">
                  <img
                    src={e.author.image}
                    className="flex max-w-[40px] max-h-[40px] mx-2"
                  ></img>
                  Creador{" "}
                  <span className="flex text-orange-600">
                    {" "}
                    {e.author.userName}
                  </span>
                </h2>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
