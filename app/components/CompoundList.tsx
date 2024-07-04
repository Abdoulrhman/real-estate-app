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
  setCompounds: React.Dispatch<React.SetStateAction<Compound[]>>;
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
}

const CompoundList: React.FC<CompoundListProps> = ({
  compounds,
  onFavorite,
  onLocate,
  favorites,
  setCompounds,
  setFavorites,
}) => {
  const baseUrl = process.env.API_URL || "";
  const apiUrl = `${baseUrl}/api/compounds`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
      {compounds.map((compound) => (
        <CompoundCard
          key={compound.id}
          {...compound}
          onFavorite={onFavorite}
          onLocate={() => onLocate(compound)}
          setCompounds={setCompounds}
          setFavorites={setFavorites}
          compounds={compounds}
        />
      ))}
    </div>
  );
};

export default CompoundList;
