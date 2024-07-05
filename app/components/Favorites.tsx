import React from "react";
import CompoundCard from "./CompoundCard";
import { Compound } from "../types";

interface FavoritesProps {
  favorites: number[];
  compounds: Compound[];
  onRemove: (id: number) => void;
  onClear: () => void;
  setCompounds: React.Dispatch<React.SetStateAction<Compound[]>>;
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
}

const Favorites: React.FC<FavoritesProps> = ({
  compounds,
  onRemove,
  onClear,
  setCompounds,
  setFavorites,
}) => {
  const favoriteCompounds = compounds.filter(
    (compound) => compound.isFavorite === true
  );

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Favorites</h2>
      {favoriteCompounds.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {favoriteCompounds.map((compound) => (
              <CompoundCard
                key={compound.id}
                id={compound.id}
                location={compound.location}
                price={compound.price}
                image={compound.image}
                isFavorite={compound.isFavorite}
                onFavorite={onRemove}
                onLocate={() => {}}
                setCompounds={setCompounds}
                setFavorites={setFavorites}
                compounds={compounds}
              />
            ))}
          </div>
          <button
            onClick={onClear}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
          >
            Clear Favorites
          </button>
        </>
      ) : (
        <p>No favorite compounds yet.</p>
      )}
    </div>
  );
};

export default Favorites;
