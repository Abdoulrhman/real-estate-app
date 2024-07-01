import React from "react";
import CompoundCard from "./CompoundCard";

interface FavoritesProps {
  favorites: number[];
  compounds: {
    id: number;
    location: string;
    price: number;
    image: string;
  }[];
  onRemove: (id: number) => void;
  onClear: () => void;
}

const Favorites: React.FC<FavoritesProps> = ({
  favorites,
  compounds,
  onRemove,
  onClear,
}) => {
  const favoriteCompounds = compounds.filter((compound) =>
    favorites.includes(compound.id)
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
                isFavorite={true}
                onFavorite={onRemove}
                onLocate={() => {}}
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
