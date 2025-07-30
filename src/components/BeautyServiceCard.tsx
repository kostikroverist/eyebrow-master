"use client";
import { BeautyService } from "@/interfaces/BeautyService";
import Image from "next/image";
import React, { useState } from "react";
type Props = {
  cardBeauty: BeautyService;
};
const BeautyServiceCard = ({ cardBeauty }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="relative w-[250px] text-white  h-[300px] bg-pink-600 m-2 flex
  justify-center items-center flex-col p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
    >
      {isOpen === true ? (
        <div className="flex flex-col items-center justify-between h-full">
          <p className="text-[18px] font-bold">Ціна: {cardBeauty.price} грн</p>
          <button className="flex  mt-4 px-4 py-3 text-[14px] bg-black text-white font-bold rounded-full hover:bg-gray-700 transition-colors duration-300">
            Записатись онлайн
          </button>
        </div>
      ) : (
        <>
          <div className="relative w-full flex justify-center">
            <div className="absolute -top-12 z-1">{cardBeauty.icon}</div>
            <Image
              src={cardBeauty.image || "/icons/default-icon.png"}
              alt={cardBeauty.title}
              width={100}
              height={84}
              className="mb-2"
            />
          </div>

          <h3 className="text-center text-lg font-semibold mt-2">
            {cardBeauty.title}
          </h3>
        </>
      )}
    </div>
  );
};

export default BeautyServiceCard;
