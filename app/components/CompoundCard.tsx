import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface CompoundCardProps {
  id: number;
  location: string;
  price: number;
  image: string;
  isFavorite: boolean;
  onFavorite: (id: number) => void;
  onLocate: () => void;
}

const CompoundCard: React.FC<CompoundCardProps> = ({
  id,
  location,
  price,
  image,
  isFavorite,
  onFavorite,
  onLocate,
}) => {
  return (
    <motion.div
      className="relative p-4 bg-white rounded-lg shadow-lg cursor-pointer"
      onClick={onLocate}
      transition={{ ease: "easeOut", duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={image}
        alt={location}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="mt-2">
        <h2 className="text-lg font-semibold">{location}</h2>
        <p className="text-gray-500">${price.toLocaleString()}</p>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onFavorite(id);
        }}
        className="absolute bottom-3 right-2 cursor-pointer"
      >
        {isFavorite ? (
          <FaHeart className="text-red-500" size={24} />
        ) : (
          <FaRegHeart className="text-gray-500" size={24} />
        )}
      </div>
    </motion.div>
  );
};

export default CompoundCard;
