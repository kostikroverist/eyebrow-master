// components/VideoDescription.tsx
import React from "react";

interface VideoDescriptionProps {
  videoUrl: string;
  title: string;
  description: string;
}

const VideoDescription: React.FC<VideoDescriptionProps> = ({
  videoUrl,
  title,
  description,
}) => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl text-center sm:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight">
        {title}
      </h2>
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        {/* Опис (перший елемент для мобільної версії) */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col justify-center">
          <p className="text-[24px] text-center md:text-left text-white leading-relaxed">
            {description}
          </p>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="w-full h-[500px]">
            <iframe
              className="w-full h-full rounded-xl shadow-2xl "
              src={videoUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDescription;
