"use client";
import React from "react";
import CompoundCard from "./CompoundCard";
import axios from "axios";

interface Compound {
  id: number;
  location: string;
  price: number;
  image: string;
  position: [number, number];
  isFavorite: boolean;
}

interface CompoundListProps {
  compounds: Compound[];
  onFavorite: (id: number) => void;
  favorites: number[];
  onLocate: (compound: Compound) => void;
}

const CompoundList: React.FC<CompoundListProps> = ({
  compounds,
  onFavorite,
  onLocate,
  favorites,
}) => {
  const baseUrl = process.env.API_URL || "";
  const apiUrl = `${baseUrl}/api/compounds`;

  const handleFavorite = async (compound: Compound) => {
    try {
      const updatedCompound = { ...compound, isFavorite: !compound.isFavorite };
      const response = await axios.put(apiUrl, updatedCompound);
      if (response.status === 200) {
        onFavorite(compound.id);
      } else {
        console.error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
      {compounds.map((compound) => (
        <CompoundCard
          key={compound.id}
          {...compound}
          onFavorite={() => handleFavorite(compound)}
          onLocate={() => onLocate(compound)}
        />
      ))}
    </div>
  );
};

export default CompoundList;
