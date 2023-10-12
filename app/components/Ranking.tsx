"use client";
import { URL } from "@/utils/constants";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Ranking() {
  const [ranking, setRanking] = useState<any>([]);
  const [displayedRanking, setDisplayedRanking] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const resp = await axios.get(`${URL}/user`);
        setRanking(resp.data.slice(0, 10));
        setDisplayedRanking(resp.data.slice(0, 5));
      } catch (err) {
        console.log(err);
      }
    };
    fetchRanking();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 10);
      setDisplayedRanking((prevRanking: any) => [
        ...prevRanking.slice(1),
        ranking[(currentIndex + 5) % 10],
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, ranking]);

  console.log(ranking.length, "????")

  return (
    <div className="flex flex-row justify-center space-x-2 h-[50px] w-full shadow-md">
      <Link
        href={`/ranking`}
        className="flex justify-center items-center hover:text-amber-700 underline font-bold text-amber-500"
      >
        RANKING
      </Link>
      {ranking.length === 10
        ? displayedRanking.map((e: any, index: number) => (
            <h6
              className="flex w-[150px] justify-center items-center px-6 space-x-2"
              key={index}
            >
              <button className="flex font-semibold text-amber-700 hover:text-amber-500">
                <h5
                  className={
                    ((index + currentIndex) % 10) + 1 === 1
                      ? "flex flex-row space-x-1 text-amber-600 font-bold"
                      : "flex flex-row space-x-1 font-semibold"
                  }
                >
                  <h4>{((index + currentIndex) % 10) + 1}.</h4>
                  <Link href={`/perfil/${e.id}`}>
                    {e.userName && e.userName}
                  </Link>
                </h5>
              </button>
              <span>{e.points && e.points}.P</span>
            </h6>
          ))
        : ranking.map((e: any, index: number) => (
            <h6
              className="flex w-[150px] justify-center items-center px-6 space-x-2"
              key={index}
            >
              <button className="flex font-semibold text-amber-700 hover:text-amber-500">
                <h5
                  className={"flex flex-row space-x-1 text-amber-600 font-bold"}
                >
                  <h4>{index + 1}.</h4>
                  <Link href={`/perfil/${e.id}`}>
                    {e.userName && e.userName}
                  </Link>
                </h5>
              </button>
              <span>{e.points && e.points}.P</span>
            </h6>
          ))}
    </div>
  );
}
