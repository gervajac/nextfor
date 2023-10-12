import { URL } from "@/utils/constants";
import axios from "axios";
import Link from "next/link";

const fetch = async () => {
  try {
    const resp = await axios.get(`${URL}/user`);
    return resp;
  } catch (err) {
    console.log(err);
  }
};

export default async function Ranking() {
  const resp = await fetch();

  console.log(resp, "resp");

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center flex-col min-h-screen h-auto w-[900px] bg-neutral-700 shadow-2xl">
        <div className="flex flex-col justify-center bg-neutral-700 w-full h-[auto] border-b-2 border-amber-600">
          <h6 className="flex justify-center text-3xl m-3 text-amber-600">
            TOP Usuarios
          </h6>
          <ul className="flex justify-start flex-col">
            <li className="flex font-semibold text-xl ml-2">
              Sistema y reglas de puntuación.
            </li>
            <li className="flex ml-2">
              <h5 className="text-amber-700 mr-1">+5</h5> Puntos por POST
              creado.
            </li>
            <li className="flex ml-2">
              <h5 className="text-amber-700 mr-1">+1</h5> Puntos por comentario
              en POST(Creador).
            </li>
            <li className="flex ml-2">
              <h5 className="text-amber-700 mr-1">+1</h5> Punto por LIKE
              recibido en POST(Creador).
            </li>
            <li className="flex ml-2 mb-3">
              <h5 className="text-amber-700 mr-1">+1</h5> Punto por COMENTARIO
              realizado en POST(Usuario comentador).
            </li>
          </ul>
        </div>
        <div className="flex justify-start items-start flex-col bg-neutral-700 w-full h-full">
          <div className="flex flex-row w-full h-[40px] bg-neutral-600 border-2 border-neutral-800">
            <div className="flex w-[50px] justify-center items-center">
              Rank
            </div>
            <div className="flex w-[50px] justify-center items-center">Img</div>
            <div className="flex w-[700px] justify-center flex-col items-start ml-4">
              <h5>Username</h5>
            </div>
            <div className="flex w-[50px] justify-center items-center">
              Puntos
            </div>
          </div>
          {resp &&
            resp.data.map((e: any, index: number) => {
              return (
                <div className="flex flex-row w-full h-[100px] bg-neutral-600 border-2 border-neutral-800">
                  <div className="flex w-[50px] justify-center items-center">
                    {index + 1}
                  </div>
                  <div className="flex w-[50px] justify-center items-center">
                    <img
                      className="flex w-[40px] h-[40px]"
                      src={e.image}
                      alt=""
                    ></img>
                  </div>
                  <div className="flex w-[700px] justify-center flex-col items-start ml-4">
                    <Link href={`/perfil/${e.id}`}>{e.userName}</Link>
                    <h2 className="flex justify-start items-start text-amber-500">
                      {e.createdAt.slice(0, 10)}
                    </h2>
                  </div>
                  <div className="flex w-[50px] justify-center items-center">
                    {e.points}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
