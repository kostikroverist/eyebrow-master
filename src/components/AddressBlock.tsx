import React from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";

interface AddressBlockProps {
  streetName: string;
}

const AddressBlock: React.FC<AddressBlockProps> = ({ streetName }) => {
  return (
    <div className="mt-10 bg-gradient-to-r from-pink-100 via-purple-100 to-white p-8 rounded-3xl max-w-md mx-auto text-center shadow-2xl border border-gray-200">
      <div className="flex justify-center mb-4">
        <MapPinIcon className="w-10 h-10 text-[#5d3954]" />
      </div>
      <h2 className="text-[#5d3954] text-2xl font-bold mb-2">EVAstudio</h2>
      <p className="text-gray-700 text-md mb-4">{streetName}</p>
      {/* <button className="bg-[#c6005c] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#a5004a] transition">
        Як пройти
      </button> */}
    </div>
  );
};

export default AddressBlock;
