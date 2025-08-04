import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          {/* Фотографія */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0 flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-lg">
              {/* Замініть 'your-image-url.jpg' на URL вашого зображення */}
              <Image
                src="/images/marta.jpg"
                alt="Profile Picture" 
                layout="fill" 
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
          
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-4xl font-bold text-white mb-4 text-center">Про мене</h2>
            <p className="text-lg text-white leading-relaxed mb-4">
             Мене звати Марта. Я працюю з бровами та макіяжем так, щоб ви закохалися у своє відображення. У кожній роботі бачу мистецтво, де кольори, лінії та форми створюють гармонію. 
            </p>
            <p className="text-lg text-white leading-relaxed">
             Моє завдання — підкреслити те, що в вас уже є найкращого.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;