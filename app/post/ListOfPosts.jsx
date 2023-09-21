import { URL } from "@/utils/constants";
import Link from "next/link";

export async function ListOfPosts() {
  const fetchPost = async () => {
    return fetch(`${URL}/post`).then((res) => res.json());
  };

  const posts = await fetchPost();

  return (
    <div className="flex flex-row">
      <div className="flex flex-col max-w-[250px]">
        <h6 className="flex justify-center font-bold text-2xl text-orange-700">
          Nuevos Post
        </h6>
        {posts.post.map((e) => {
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
        {posts.programacion.map((e) => {
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
          Empleos
        </h6>
        {posts.empleos.map((e) => {
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
          Cursos/Educacion
        </h6>
        {posts.educacion.map((e) => {
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
    </div>
  );
}
