"use client";
import { useEffect, useState } from "react";
import { URL } from "@/utils/constants";
import { Comment } from "./Comment";
import axios from "axios";
import { uploadFile } from "@/app/config/config";
import like from "../../assets/like.svg";

export default function Post({ params }: any) {
  const { id } = params;
  const [connected, setConnected] = useState(false);
  const [fillHearth, setFillHearth] = useState(false);
  const [Hearth, setHearth] = useState(false);
  const [disabledLike, setDisabledLike] = useState(false);
  const [parsedData, setParsedData] = useState({});
  const [likes, setLikes] = useState<any>([]);
  const [post, setPost] = useState<any>([]);
  const [newComment, setNewComment] = useState({
    description: "",
    image: "",
    authorId: "",
    postId: id,
  });
  const [localComments, setLocalComments] = useState<any>([]);
  const [newLocalComment, setNewLocalComment] = useState({
    description: "",
    image: "",
    authorId: "",
    postId: id,
    author: {},
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("user");
      const isConnected = storage && storage.length > 1;
      if (isConnected) {
        const parsedUserData = JSON.parse(storage);
        setConnected(true);
        newComment.authorId = parsedUserData.id;
        setNewLocalComment({ ...newLocalComment, author: parsedUserData });
      }
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${URL}/comment/${id}`);
        console.log(response.data, "respuesta del post");
        setPost(response.data);
        setLikes(response.data.likes);
        const log = response.data.likes.some(
          (e: any) => e === newComment.authorId
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
    setNewComment({ ...newComment, [name]: value });
    setNewLocalComment({ ...newLocalComment, [name]: value });
  };

  const handleSendComment = async () => {
    try {
      console.log(newComment, "nuevo comentario antes de entrar en setlocal");
      const resp = await axios.post(`${URL}/comment`, newComment);
      setLocalComments([...localComments, newComment]);
      setNewComment({
        description: "",
        image: "",
        authorId: newComment.authorId,
        postId: id,
      });
      console.log(localComments, "localcoments post resp");
    } catch (err) {
      console.log(err);
    }
  };

  const like = async () => {
    try {
      const resp = await axios.post(`${URL}/user/like/${id}`, {
        userId: newComment.authorId,
      });
      console.log(resp, "resp");
      setLikes([...likes, +1]);
      setDisabledLike(true);
    } catch (err) {
      console.log(err);
    }
    setHearth(true);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name } = event.target;
    const file = event.target.files && event.target.files[0];
    try {
      if (file) {
        const result = await uploadFile(file);
        const reader = new FileReader();
        setNewComment({ ...newComment, image: result });
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  console.log(localComments, "asd");

  return (
    <div className="flex flex-col min-h-screen h-auto w-auto min-w-[900px] max-w-[1000px]">
      {post.postFound && post.postFound && (
        <div
          className="bg-neutral-700 flex flex-row h-auto min-h-[200px] w-auto min-w-[600px] shadow-2xl my-1" 
          key={post.postFound.id}
        >
          <div className="flex flex-col items-center bg-neutral-700 border border-black w-[200px]">
            <img
              className="flex justify-center rounded-full max-w-[90px] max-h-[90px] border border-amber-600"
              src={post.postFound.author.image}
              alt="userpic"
            ></img>
            <div className="flex justify-center ">
              {post.postFound.author.userName}
            </div>
            <h2 className="mt-auto justify-center flex bg-neutral-600 w-full border-r-2 border-neutral-700">
              Se unió: {post.postFound.author.createdAt.slice(0, 10)}
            </h2>
          </div>
          <div className="flex flex-col bg-neutral-700 w-full">
            <h6 className="flex text-amber-600 text-xl justify-center bg-neutral-600">
              {post.postFound.title} - Post Nº{post.postFound.id}
            </h6>
            <h4 className="flex p-3 font-semibold ">
              {post.postFound.description}
            </h4>
            <img
              className="flex justify-center mb-1 max-w-full p-4 h-auto max-h-[300px]"
              src={post.postFound.image && post.postFound.image}
              alt={post.postFound.image}
            ></img>
            <h2 className="mt-auto flex justify-around bg-neutral-600">
              <div className="flex flex-row items-center">
                <button
                  onClick={() => like()}
                  disabled={disabledLike || !connected ? true : false}
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
              className="bg-neutral-700 flex flex-row max-h-[400px] shadow-2xl my-1"
              key={e.id}
            >
              <div className="flex flex-col items-center bg-neutral-700 w-[200px] border border-black">
                <img
                  className="flex justify-center rounded-full w-[70px] h-[70px] border border-amber-600"
                  src={e.author.image}
                  alt="commentpic"
                ></img>
                <div className="flex justify-center ">{e.author.userName}</div>
                <h2 className="mt-auto justify-center flex bg-neutral-600 w-full border-r-2 border-neutral-700">
                  Se unió: {e.author.createdAt.slice(0, 10)}
                </h2>
              </div>
              <div className="flex flex-col bg-neutral-700 w-full">
                <h6 className="flex justify-center bg-neutral-600">
                  Comentario Nº{e.id}
                </h6>
                <h4 className="flex p-3">{e.description}</h4>
                <img
                  className="flex justify-center mb-1 max-w-full p-4 h-auto max-h-[300px]"
                  src={e.image && e.image}
                  alt={e.image && e.image}
                ></img>
                <h2 className="mt-auto flex justify-end bg-neutral-600">
                  {e.createdAt.slice(0, 10)}
                </h2>
              </div>
            </div>
          );
        })}
      {localComments &&
        localComments.map((e: any) => {
          return (
            <div className="bg-neutral-700 flex flex-row max-h-[400px] shadow-2xl border my-1">
              <div className="flex flex-col items-center bg-neutral-700 w-[200px]">
                <img
                  className="flex justify-center rounded-full w-[100px] h-[100px] border border-amber-600"
                  src={e.author.image}
                  alt="commentpic"
                ></img>
                <div className="flex justify-center ">{e.author.userName}</div>
                <h2 className="mt-auto justify-center flex bg-neutral-600 w-full border-r-2 border-neutral-700">
                  Se unió: {e.author.createdAt.slice(0, 10)}
                </h2>
              </div>
              <div className="flex flex-col bg-neutral-700 w-full">
                <h6 className="flex justify-center bg-neutral-600">
                  Comentario Nº{e.id}
                </h6>
                <h4 className="flex p-3">{e.description}</h4>
                <img
                  className="flex justify-center mb-1 max-w-full p-4 h-auto max-h-[300px]"
                  src={e.image && e.image}
                  alt={e.image}
                ></img>
                <h2 className="mt-auto flex justify-end bg-neutral-600">
                  Creado ahora mismo.
                </h2>
              </div>
            </div>
          );
        })}
      <div className="bg-neutral-700 flex flex-col h-auto max-h-[400px] shadow-2xl border my-1">
        <div className="flex justify-center h-auto bg-neutral-700">
          Agregar comentario
        </div>
        <div className="flex flex-row justify-between">
          <textarea
            onChange={(e) => handleTextAreaChange(e)}
            value={newComment.description}
            name="description"
            disabled={!connected ? true : false}
            placeholder={
              connected
                ? "Escribe aquí el texto"
                : "Logueate para poder comentar"
            }
            className="w-full h-full my-1 border border-amber-600 bg-neutral-700"
          ></textarea>
          <button
            onClick={() => handleSendComment()}
            disabled={!connected ? true : false}
            className="bg-amber-700 p-2 my-2 rounded mx-1"
          >
            Comentar
          </button>
        </div>
        <div className="flex flex-row h-auto bg-neutral-900">
          <input
            className="hidden"
            type="file"
            name="image"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handleImageChange(e)}
            id="fileInput"
            placeholder="Sube tu foto de perfil"
          />
          <div className="relative">
            <div className="flex flex-row space-x-4">
              <label
                htmlFor="fileInput"
                className="flex justify-center ml-1 text-black p-2 h-[40px] w-[140px] bg-amber-700 font-semibold my-2 rounded cursor-pointer"
              >
                Agregar imagen
              </label>
              {newComment.image && (
                <div className="relative">
                  <img
                    className="flex w-auto my-2 max-w-[400px] h-auto max-h-[300px]"
                    src={newComment.image}
                    alt="Imagen subida"
                  />
                  <button
                    onClick={() =>
                      setNewComment((prevData: any) => ({
                        ...prevData,
                        image: "",
                      }))
                    }
                    className="absolute border border-amber-700 top-0 right-0 backdrop-blur-sm p-1 text-black rounded"
                  >
                    Quitar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
