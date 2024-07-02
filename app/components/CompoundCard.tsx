import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

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
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "";
  const apiUrl = `${baseUrl}/api/compounds`;

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await axios.put(apiUrl, {
        id,
        location,
        price,
        image,
        isFavorite: !isFavorite,
      });
      if (response.status === 200) {
        onFavorite(id);
      } else {
        console.error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

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
        onClick={handleFavoriteClick}
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
