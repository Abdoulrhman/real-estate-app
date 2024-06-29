import React from "react";
import { motion } from "framer-motion";

interface CompoundCardProps {
  id: number;
  location: string;
  price: number;
  image: string;
  onFavorite: (id: number) => void;
  onLocate: () => void;
}

const CompoundCard: React.FC<CompoundCardProps> = ({
  id,
  location,
  price,
  image,
  onFavorite,
  onLocate,
}) => {
  return (
    <motion.div
      className="p-4 bg-white rounded-lg shadow-lg"
      onClick={onLocate}
    >
      <img
        src={image}
        alt={location}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="mt-2">
        <h2 className="text-lg font-semibold">{location}</h2>
        <p className="text-gray-500">${price.toLocaleString()}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(id);
          }}
          className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
        >
          Add to Favorites
        </button>
      </div>
    </motion.div>
  );
};

export default CompoundCard;
