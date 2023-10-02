import axios from "axios";
import { URL } from "@/utils/constants";
import Link from "next/link";

const fetchSection = async (word: any) => {
  try {
    const resp = await axios.get(`${URL}/post/filter/${word}`);
    return resp;
  } catch (err) {
    console.log(err);
  }
};

export default async function SectionListing({ params }: any) {
  const { word } = params;
  console.log(word);
  const sectionData = await fetchSection(word);
  const data = sectionData?.data;
  console.log(word, "dataaaa");
  return (
    <section className="flex justify-center items-center bg-neutral-800">
      <div className="flex items-center justify-center flex-col h-screen w-[900px] bg-neutral-700 shadow-2xl">
        <div className="flex justify-start items-start flex-col bg-neutral-700 w-full h-[150px] border-b-2 border-amber-600">
          <div className="flex flex-row justify-between w-full">
            <span className="flex flex-row">
              <h6 className="flex text-2xl m-3">Resultados para búsqueda:</h6>
              <h6 className="flex text-2xl m-3 text-amber-600">"{word}"</h6>
            </span>
            <div className="flex mr-4">
              <Link
                href={`/post/create`}
                className="rounded-xl bg-amber-700 my-2 p-2"
              >
                Crear POST
              </Link>
            </div>
          </div>
          <span className="flex flex-row">
              <h6 className="flex text-2xl m-3">Posts encontrados:</h6>
              <h6 className="flex text-2xl m-3 text-amber-600">{data.post.length}</h6>
            </span>
        </div>
        <div className="flex justify-start items-center flex-col bg-neutral-700 w-full h-full">
          <div className="flex flex-row w-full h-[40px] bg-neutral-600 border-2 border-neutral-800">
            <div className="flex w-[50px] justify-center items-center">RAT</div>
            <div className="flex w-[700px] justify-center flex-col items-start ml-4">
              <h5> TITULO</h5>
            </div>
            <div className="flex flex-row w-[50px] justify-center items-center space-x-6">
              <h5>Comentarios</h5>
              <h5 className="flex">Fecha</h5>
            </div>
          </div>
          {data &&
            data.post.map((e: any) => {
              return (
                <div className="flex flex-row w-full h-[100px] bg-neutral-600 border-2 border-neutral-800">
                  <div className="flex w-[50px] justify-center items-center">
                    IMG
                  </div>
                  <div className="flex w-auto justify-center flex-col items-start ml-4">
                    <Link href="/posts/id" as={`/post/${e.id}`}>
                      <h5 className="text-xl hover:text-amber-700">
                        {e.title}
                      </h5>
                    </Link>
                    <h2 className="flex flex-row justify-start items-start text-amber-500">
                      <span className="flex text-amber-700">
                        {e.author.userName}
                      </span>
                    </h2>
                  </div>
                  <div className="flex flex-row w-[150px] justify-end items-center ml-auto space-x-4 mr-2">
                    <h5 className="flex mr-8">
                      {e.comments && e.comments.length}
                    </h5>
                    <h5 className="">{e.createdAt.slice(0, 10)}</h5>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
