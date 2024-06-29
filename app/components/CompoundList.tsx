import React from "react";
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
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {compounds.map((compound) => (
        <CompoundCard
          key={compound.id}
          {...compound}
          onFavorite={onFavorite}
          onLocate={() => onLocate(compound)}
        />
      ))}
    </div>
  );
};

export default CompoundList;
