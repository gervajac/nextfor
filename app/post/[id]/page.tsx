"use client";
import { useEffect, useState } from "react";
import { URL } from "@/utils/constants";
import { Comment } from "./Comment";
import axios from "axios";

export default function Post({ params }: any) {
  const { id } = params;
  const [comment, setComment] = useState<any>([]);
  const [connected, setConnected] = useState(false);
  const [parsedData, setParsedData] = useState({});
  const [post, setPost] = useState<any>([]);
  const [comments, setComments] = useState({
    description: "",
    image: "",
    authorId: "",
    postId: id,
  });
  const [localComments, setLocalComments] = useState<any>([]);
  const [localComment, setLocalComment] = useState({
    description: "",
    image: "",
    authorId: "",
    postId: id,
    author: parsedData,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("user");
      const isConnected = storage && storage.length > 1;
      if (isConnected) {
        const parsedUserData = JSON.parse(storage);
        setConnected(true);
        comments.authorId = parsedUserData.id;
        setLocalComment(prevState => ({
          ...prevState,
          author: parsedUserData,
        }));
      }
    }
  }, []);
  console.log(parsedData, "parsedat");
  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("entra de nuevo aca?");
        const response = await axios.get(`${URL}/comment/${id}`);
        console.log(response.data.postFound, "respuesta del post");
        setPost(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, []);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setComments({ ...comments, [name]: value });
    setLocalComment({ ...localComment, [name]: value });
  };

  const handleSendComment = async () => {
    try {
      const resp = await axios.post(`${URL}/comment`, comments);
      setComment([...comment, resp.data]);
      setLocalComments([...localComments, localComment]);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(localComments, "aver");
console.log(localComment, "esteinteresa")
  return (
    <div>
      {post.postFound && post.postFound && (
        <div
          className="bg-gray-600 flex flex-row max-h-[400px] shadow-2xl border my-1"
          key={post.postFound.id}
        >
          <div className="flex flex-col items-center bg-gray-600 w-[200px]">
            <img
              className="flex justify-center rounded-full max-w-[100px] max-h-[100px] border border-orange-500"
              src={post.postFound.author.image}
              alt="userpic"
            ></img>
            <div className="flex justify-center ">
              {post.postFound.author.userName}
            </div>
            <h2 className="mt-auto justify-center flex bg-slate-500 w-full border-r-2 border-gray-600">
              Se unió: {post.postFound.author.createdAt.slice(0, 10)}
            </h2>
          </div>
          <div className="flex flex-col bg-gray-400 w-[500px]">
            <h6 className="flex text-orange-500 text-xl justify-center bg-slate-500">
              {post.postFound.title} - Post Nº{post.postFound.id}
            </h6>
            <h4 className="flex p-3">{post.postFound.description}</h4>
            <h2 className="mt-auto flex justify-end bg-slate-500">
              {post.postFound.createdAt.slice(0, 10)}
            </h2>
          </div>
        </div>
      )}

      {post.commentsFound &&
        post.commentsFound.map((e: any) => {
          return (
            <div
              className="bg-gray-600 flex flex-row max-h-[400px] shadow-2xl border my-1"
              key={e.id}
            >
              <div className="flex flex-col items-center bg-gray-600 w-[200px]">
                <img
                  className="flex justify-center rounded-full max-w-[100px] max-h-[100px] border border-orange-500"
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
      {localComments &&
        localComments.map((e: any) => {
          return (
            <div className="bg-gray-600 flex flex-row max-h-[400px] shadow-2xl border my-1">
              <div className="flex flex-col items-center bg-gray-600 w-[200px]">
                <img
                  className="flex justify-center rounded-full max-w-[100px] max-h-[100px] border border-orange-500"
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
                  Creado ahora mismo.
                </h2>
              </div>
            </div>
          );
        })}
      <div className="bg-gray-600 flex flex-col h-auto max-h-[400px] shadow-2xl border my-1">
        <div className="flex justify-start h-auto bg-slate-400">
          Agregar comentario
        </div>
        <div className="flex justify-between">
          <textarea
            onChange={(e) => handleTextAreaChange(e)}
            name="description"
            placeholder="Escribe aquí el texto"
            className="w-full h-full my-1 border border-orange-500 bg-gray-700"
          ></textarea>
          <button
            onClick={() => handleSendComment()}
            className="bg-orange-600 p-2 my-2 rounded mx-1"
          >
            Comentar
          </button>
        </div>
      </div>
    </div>
  );
}
