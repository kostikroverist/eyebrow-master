"use client";
import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Photo {
  src: string;
}

// Твої фотографії
const photos: Photo[] = [
  { src: "/images/hero.JPG" },
  { src: "/images/IMG_3548.JPG" },
  { src: "/images/IMG_4804.JPG" },
  { src: "/images/IMG_4805.JPG" },
  { src: "/images/IMG_4974.JPG" },
  { src: "/images/IMG_5010.JPG" },
  { src: "/images/IMG_5072.JPG" },
  { src: "/images/IMG_5082.JPG" },
  { src: "/images/photoone.jpg" },
  { src: "/images/phototwo.jpg" },
];

const PortfolioGrid: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = photos.map((photo) => ({ src: photo.src }));

  return (
    <>
      <div id="portfolio" className="container mx-auto p-4">
        <h2 className="text-3xl text-center sm:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight">
          Наше портфоліо
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => {
                setCurrentIndex(index);
                setOpen(true);
              }}
            >
              <Image
                src={photo.src}
                alt={`Portfolio image ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={currentIndex}
      />
    </>
  );
};

export default PortfolioGrid;
