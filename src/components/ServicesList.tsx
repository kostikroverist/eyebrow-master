import React from "react";
import { beautyServices } from "@/constant/constants";
import Button from "./Button";

const ServicesList = () => {
  return (
    <section className="bg-gray-950 font-sans text-white w-full py-12 sm:py-20">
      <h2 className="text-3xl text-center sm:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight">
        Наші послуги
      </h2>
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col">
          {beautyServices.map((service) => (
            <div
              key={service.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-b border-gray-700 last:border-b-0"
            >
              {/* Ліва частина: Назва послуги */}
              <div className="flex-grow">
                <h3 className="text-xl md:text-2xl text-white">
                  {service.title}
                </h3>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-x-6 md:gap-x-8 w-full sm:w-auto">
                <div className="flex items-center justify-center min-w-[120px]">
                  {service.price ? (
                    <span className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap">
                      {service.price} грн
                    </span>
                  ) : (
                    service.icon && <div>{service.icon}</div>
                  )}
                </div>

                <Button title="Записатися" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
