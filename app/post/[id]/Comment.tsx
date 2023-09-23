"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "@/utils/constants";

export function Comment({ params }: any) {
  const [connected, setConnected] = useState(false);
  const [comment, setComment] = useState({
    description: "",
    image: "",
    authorId: "",
    postId: params.id,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("user");
      const isConnected = storage && storage.length > 1;
      if (isConnected) {
        const parsedUserData = JSON.parse(storage);
        setConnected(true);
        comment.authorId = parsedUserData.id.toString();
        console.log(parsedUserData, "parsedata");
        console.log(comment, "comment");
      }
      setConnected(false);
    }
  }, []);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
    console.log(comment);
  };

  const handleSendComment = async () => {
    try {
      const resp = await axios.post(`${URL}/comment`, comment);
      console.log(resp, "respuestadelcomment");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(params, "encomment");

  return (
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
  );
}
