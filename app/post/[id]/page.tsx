"use client";
import { useEffect, useState } from "react";
import { URL } from "@/utils/constants";
import { Comment } from "./Comment";
import axios from "axios";
import like from "../../assets/like.svg";

export default function Post({ params }: any) {
  const { id } = params;
  const [comment, setComment] = useState<any>([]);
  const [connected, setConnected] = useState(false);
  const [fillHearth, setFillHearth] = useState(false);
  const [Hearth, setHearth] = useState(false);
  const [disabledLike, setDisabledLike] = useState(false);
  const [parsedData, setParsedData] = useState({});
  const [likes, setLikes] = useState<any>([]);
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
        setLocalComment((prevState) => ({
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
        setLikes(response.data.likes);
        const log = response.data.likes.some(
          (e: any) => e === comments.authorId
        );
        if (log) {
          setFillHearth(true);
          setDisabledLike(true);
        }
        console.log(log);
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

  const like = async () => {
    try {
      const resp = await axios.post(`${URL}/user/like/${id}`, {
        userId: comments.authorId,
      });
      console.log(resp, "resp");
      setLikes([...likes, +1]);
      setDisabledLike(true);
    } catch (err) {
      console.log(err);
    }
    setHearth(true);
  };

  console.log(localComments, "aver");
  console.log(localComment, "esteinteresa");
  return (
    <div className="flex flex-col h-screen">
      {post.postFound && post.postFound && (
        <div
          className="bg-gray-600 flex flex-row max-h-[400px] shadow-2xl border-2 my-1 border-orange-700"
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
            <h4 className="flex p-3 font-semibold">
              {post.postFound.description}
            </h4>
            <h2 className="mt-auto flex justify-around bg-slate-500">
              <div className="flex flex-row items-center">
                <button
                  onClick={() => like()}
                  disabled={disabledLike ? true : false}
                  onMouseEnter={() => setFillHearth(true)}
                  onMouseLeave={() => setFillHearth(false)}
                  className="flex w-[30px]"
                >
                  <svg
                    fill={fillHearth || Hearth ? "#FF0000" : "#black"}
                    className="svg-icon max-w-[35px]"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                  </svg>
                </button>
                <h3>{likes && likes.length}</h3>
              </div>
              {post.postFound.createdAt.slice(0, 10)}
            </h2>
          </div>
        </div>
      )}

      {post.commentsFound &&
        post.commentsFound.map((e: any) => {
          return (
            <div
              className="bg-gray-600 flex flex-row max-h-[400px] shadow-2xl my-1"
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
