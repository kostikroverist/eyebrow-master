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
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col justify-center">
          <p className="text-[24px] text-center md:text-left text-white leading-relaxed">
            {description}
          </p>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="w-full h-[500px]">
            <video
              className="w-full h-full rounded-xl shadow-2xl object-cover"
              src={videoUrl}
              title={title}
              muted
              autoPlay
              playsInline
              controls
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDescription;
