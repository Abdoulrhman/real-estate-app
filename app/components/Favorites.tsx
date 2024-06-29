import React from "react";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteCompounds.map((compound) => (
              <div
                key={compound.id}
                className="p-4 bg-white rounded-lg shadow-lg"
              >
                <img
                  src={compound.image}
                  alt={compound.location}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-2">
                  <h2 className="text-lg font-semibold">{compound.location}</h2>
                  <p className="text-gray-500">
                    ${compound.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => onRemove(compound.id)}
                    className="mt-2 bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
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
