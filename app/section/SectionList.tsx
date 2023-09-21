export async function SectionList() {
  return (
    <div className="flex items-center flex-col h-screen w-[900px] bg-gray-700 shadow-2xl">
      <div className="flex justify-start items-start flex-col bg-slate-700 w-full h-[150px] border-b-2 border-orange-600">
        <div className="flex flex-row justify-between w-full">
          <h6 className="flex text-2xl m-3">Programación</h6>
          <div className="flex mr-4">
            <button className="rounded-xl bg-orange-700 my-2 p-2">
              Crear POST
            </button>
          </div>
        </div>
        <h6 className="flex ml-2">
          En esta sección vas a encontrar todo sobre Programación, novedades,
          lenguajes, dudas y consultas.
        </h6>
      </div>
      <div className="flex justify-start items-start flex-col bg-gray-700 w-full h-full">
        <div className="flex flex-row w-full h-[40px] bg-slate-600 border-2 border-gray-800">
          <div className="flex w-[50px] justify-center items-center">RAT</div>
          <div className="flex w-[700px] justify-center flex-col items-start ml-4">
            <h5> TITULO</h5>
          </div>
          <div className="flex w-[50px] justify-center items-center">
            Comentarios
          </div>
        </div>
        <div className="flex flex-row w-full h-[100px] bg-slate-600 border-2 border-gray-800">
          <div className="flex w-[50px] justify-center items-center">IMG</div>
          <div className="flex w-[700px] justify-center flex-col items-start ml-4">
            <h5> TITULO DEL PSOTEO EN CUESTION EN COLOR NARANGA</h5>
            <h2 className="flex justify-start items-start text-orange-500">
              Creador horariofecha
            </h2>
          </div>
          <div className="flex w-[50px] justify-center items-center">
            Comentarios
          </div>
        </div>
      </div>
    </div>
  );
}
