"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CompoundList from "./components/CompoundList";
import Favorites from "./components/Favorites";
import Search from "./components/Search";
import dynamic from "next/dynamic";

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import("./components/Map"), { ssr: false });

interface Compound {
  id: number;
  location: string;
  price: number;
  image: string;
  position: [number, number];
}

const Home = () => {
  const [compounds, setCompounds] = useState<Compound[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [activeCompound, setActiveCompound] = useState<Compound | null>(null);

  useEffect(() => {
    axios.get("/api/compounds").then((response) => setCompounds(response.data));
  }, []);

  const handleFavorite = (id: number) => {
    setFavorites((prev) => [...prev, id]);
  };

  const handleRemove = (id: number) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  const handleClear = () => {
    setFavorites([]);
  };

  const handleLocate = (compound: Compound) => {
    setActiveCompound(compound);
  };

  const filteredCompounds = compounds.filter((compound) =>
    compound.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Real Estate Marketplace</h1>
      <Search query={query} setQuery={setQuery} />
      <Map compounds={compounds} activeCompound={activeCompound} />
      <CompoundList
        compounds={filteredCompounds}
        onFavorite={handleFavorite}
        onLocate={handleLocate}
      />
      <Favorites
        favorites={favorites}
        compounds={compounds}
        onRemove={handleRemove}
        onClear={handleClear}
      />
    </div>
  );
};

export default Home;
