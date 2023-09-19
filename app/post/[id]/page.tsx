import { URL } from "@/utils/constants";

const fetchPost = async (id: any) => {
  return fetch(`${URL}/post/${id}`).then((res) => res.json());
};

const fetchComment = async (id: any) => {
  return fetch(`${URL}/comment/${id}`).then((res) => res.json());
};

export default async function Post({ params }) {
  const { id } = params;
  console.log(id);
  const post = await fetchPost(id);
  const comment = await fetchComment(id);

  return (
    <div>
      <div className="bg-gray-600 flex flex-row max-h-[400px] shadow-2xl border my-1">
        <div className="flex flex-col items-center bg-gray-600 w-[200px]">
          <img
            className="flex justify-center rounded-full max-w-[100px] max-h-[100px] border border-blue-500"
            src={post.author.image}
            alt="userpic"
          ></img>
          <div className="flex justify-center ">{post.author.userName}</div>
          <h2 className="mt-auto justify-center flex bg-slate-500 w-full border-r-2 border-gray-600">
            Se unió: {post.author.createdAt.slice(0, 10)}
          </h2>
        </div>
        <div className="flex flex-col bg-gray-400 w-[500px]">
          <h6 className="flex text-blue-700 text-xl justify-center bg-slate-500">
            {post.title} - Post Nº{post.id}
          </h6>
          <h4 className="flex p-3">{post.description}</h4>
          <h2 className="mt-auto flex justify-end bg-slate-500">
            {post.createdAt.slice(0, 10)}
          </h2>
        </div>
      </div>
      {comment.map((e: any) => {
        return (
          <div className="bg-gray-600 flex flex-row max-h-[400px] shadow-2xl border my-1">
            <div className="flex flex-col items-center bg-gray-600 w-[200px]">
              <img
                className="flex justify-center rounded-full max-w-[100px] max-h-[100px] border border-blue-500"
                src={e.author.image}
                alt="commentpic"
              ></img>
              <div className="flex justify-center ">{e.author.userName}</div>
              <h2 className="mt-auto justify-center flex bg-slate-500 w-full border-r-2 border-gray-600">
                Se unió: {e.author.createdAt.slice(0, 10)}
              </h2>
            </div>
            <div className="flex flex-col bg-gray-400 w-[500px]">
              <h6 className="flex justify-center bg-slate-500">
                Comentario Nº{e.id}
              </h6>
              <h4 className="flex p-3">{e.description}</h4>
              <h2 className="mt-auto flex justify-end bg-slate-500">
                {e.createdAt.slice(0, 10)}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}
