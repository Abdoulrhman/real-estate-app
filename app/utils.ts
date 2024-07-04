import axios from "axios";
import { Compound } from "./types"; 

export const updateCompound = async (apiUrl: string, compound: Compound): Promise<void> => {
  try {
    await axios.put(apiUrl, compound);
  } catch (error) {
    console.error("Failed to update compound", error);
  }
};

export const handleFavorite = async (
  compounds: Compound[],
  setCompounds: React.Dispatch<React.SetStateAction<Compound[]>>,
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>,
  apiUrl: string,
  id: number
): Promise<void> => {
  const updatedCompounds = compounds.map((compound) =>
    compound.id === id ? { ...compound, isFavorite: !compound.isFavorite } : compound
  );
  setCompounds(updatedCompounds);

  const favoriteCompound = updatedCompounds.find((compound) => compound.id === id);
  if (favoriteCompound) {
    await updateCompound(apiUrl, favoriteCompound);
  }

  setFavorites(updatedCompounds.filter((compound) => compound.isFavorite).map((compound) => compound.id));
};

export const handleRemove = async (
  compounds: Compound[],
  setCompounds: React.Dispatch<React.SetStateAction<Compound[]>>,
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>,
  apiUrl: string,
  id: number
): Promise<void> => {
  const updatedCompounds = compounds.map((compound) =>
    compound.id === id ? { ...compound, isFavorite: false } : compound
  );
  setCompounds(updatedCompounds);

  const removedCompound = updatedCompounds.find((compound) => compound.id === id);
  if (removedCompound) {
    await updateCompound(apiUrl, removedCompound);
  }

  setFavorites(updatedCompounds.filter((compound) => compound.isFavorite).map((compound) => compound.id));
};

export const handleClear = async (
  compounds: Compound[],
  setCompounds: React.Dispatch<React.SetStateAction<Compound[]>>,
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>,
  apiUrl: string
): Promise<void> => {
  const updatedCompounds = compounds.map((compound) => ({ ...compound, isFavorite: false }));
  setCompounds(updatedCompounds);
  setFavorites([]);

  await Promise.all(updatedCompounds.map((compound) => updateCompound(apiUrl, compound)));
};
