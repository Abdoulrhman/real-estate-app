import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { handleFavorite } from "../utils"; // Import the utility function
import { Compound } from "../types"; // Import the Compound type

interface CompoundCardProps {
  id: number;
  location: string;
  price: number;
  image: string;
  isFavorite: boolean;
  onFavorite: (id: number) => void;
  onLocate: () => void;
  compounds: Compound[];
  setCompounds: React.Dispatch<React.SetStateAction<Compound[]>>;
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
}

const CompoundCard: React.FC<CompoundCardProps> = ({
  id,
  location,
  price,
  image,
  isFavorite,
  onFavorite,
  onLocate,
  compounds,
  setCompounds,
  setFavorites,
}) => {
  const [loading, setLoading] = useState(false);
  const baseUrl = useMemo(() => process.env.API_URL || "", []);
  const apiUrl = useMemo(() => `${baseUrl}/api/compounds`, [baseUrl]);

  const handleFavoriteClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      setLoading(true);
      try {
        await handleFavorite(compounds, setCompounds, setFavorites, apiUrl, id);
        onFavorite(id);
      } catch (error) {
        console.error("Error updating favorite status:", error);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, compounds, id, onFavorite, setCompounds, setFavorites]
  );

  return (
    <motion.div
      className="relative p-4 bg-white rounded-lg shadow-lg cursor-pointer"
      onClick={onLocate}
      transition={{ ease: "easeOut", duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={image}
        alt={`Image of ${location}`}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="mt-2">
        <h2 className="text-lg font-semibold">{location}</h2>
        <p className="text-gray-500">${price.toLocaleString()}</p>
      </div>
      <div
        onClick={handleFavoriteClick}
        className="absolute bottom-3 right-2 cursor-pointer"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        data-testid={`favorite-button-${id}`}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        ) : isFavorite ? (
          <FaHeart className="text-red-500" size={24} />
        ) : (
          <FaRegHeart className="text-gray-500" size={24} />
        )}
      </div>
    </motion.div>
  );
};

export default CompoundCard;
