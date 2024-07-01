"use client";
import React, { useEffect } from "react";
import CompoundCard from "./CompoundCard";

interface CompoundListProps {
  compounds: {
    id: number;
    location: string;
    price: number;
    image: string;
    position: [number, number];
  }[];
  onFavorite: (id: number) => void;
  favorites: number[];
  onLocate: (compound: {
    id: number;
    location: string;
    price: number;
    image: string;
    position: [number, number];
  }) => void;
}

const CompoundList: React.FC<CompoundListProps> = ({
  compounds,
  onFavorite,
  onLocate,
  favorites,
}) => {
  useEffect(() => {
    console.log({ favorites });
  }, [favorites]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
      {compounds.map((compound) => (
        <CompoundCard
          key={compound.id}
          {...compound}
          onFavorite={onFavorite}
          onLocate={() => onLocate(compound)}
          isFavorite={favorites ? favorites.includes(compound.id) : false}
        />
      ))}
    </div>
  );
};

export default CompoundList;
