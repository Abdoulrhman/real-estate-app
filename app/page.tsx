"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CompoundList from "./components/CompoundList";
import Favorites from "./components/Favorites";
import Search from "./components/Search";
import Modal from "./components/Modal";
import dynamic from "next/dynamic";
import ReactModal from "react-modal";
import Image from "next/image";
import { FaList, FaMap } from "react-icons/fa";

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface Compound {
  id: number;
  location: string;
  price: number;
  image: string;
  position: [number, number];
  isFavorite: boolean;
}

const Home = () => {
  const [compounds, setCompounds] = useState<Compound[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [activeCompound, setActiveCompound] = useState<Compound | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapView, setIsMapView] = useState(false);

  useEffect(() => {
    axios.get("/api/compounds").then((response) => setCompounds(response.data));
  }, []);

  const handleFavorite = async (id: number) => {
    debugger;
    const updatedCompounds = compounds.map((compound) =>
      compound.id === id
        ? { ...compound, isFavorite: !compound.isFavorite }
        : compound
    );

    setCompounds(updatedCompounds);

    const favoriteCompound = updatedCompounds.find(
      (compound) => compound.id === id
    );

    if (favoriteCompound) {
      await axios.put("/api/compounds", favoriteCompound);
    }

    setFavorites(
      updatedCompounds
        .filter((compound) => compound.isFavorite)
        .map((compound) => compound.id)
    );
  };

  const handleRemove = async (id: number) => {
    const updatedCompounds = compounds.map((compound) =>
      compound.id === id ? { ...compound, isFavorite: false } : compound
    );

    setCompounds(updatedCompounds);

    const removedCompound = updatedCompounds.find(
      (compound) => compound.id === id
    );

    if (removedCompound) {
      await axios.put("/api/compounds", removedCompound);
    }

    setFavorites(
      updatedCompounds
        .filter((compound) => compound.isFavorite)
        .map((compound) => compound.id)
    );
  };

  const handleClear = async () => {
    const updatedCompounds = compounds.map((compound) => ({
      ...compound,
      isFavorite: false,
    }));

    setCompounds(updatedCompounds);
    setFavorites([]);

    await Promise.all(
      updatedCompounds.map(async (compound) => {
        await axios.put("/api/compounds", compound);
      })
    );
  };

  const handleLocate = (compound: Compound) => {
    setActiveCompound(compound);
  };

  const filteredCompounds = compounds.filter((compound) =>
    compound.location.toLowerCase().includes(query.toLowerCase())
  );

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleToggleView = () => {
    setIsMapView((prev) => !prev);
  };

  return (
    <>
      {/* Header */}
      <header className="w-full bg-white text-gray-800 p-4 border-b">
        <div className="container flex justify-between items-center mx-auto my-0">
          <Image
            src="/images/logo.svg"
            alt="Real Estate Marketplace"
            width={150}
            height={30}
          />
          <button
            className="bg-[#f9610f] text-white py-2 px-4 rounded"
            onClick={handleModalOpen}
          >
            Favorites
          </button>
        </div>
      </header>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Toggle Button for Mobile View */}
        <button
          className="md:hidden fixed bottom-4 right-4 bg-[#f9610f] text-white p-3 rounded-full shadow-lg z-[9999]"
          onClick={handleToggleView}
        >
          {isMapView ? <FaList size={24} /> : <FaMap size={24} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`w-full md:w-1/3 bg-white p-4 overflow-auto ${
            isMapView ? "hidden md:block" : "block"
          }`}
        >
          <div className="container mx-auto p-4 h-full flex flex-col">
            <Search query={query} setQuery={setQuery} />
            <div className="flex-grow overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-rounded">
              <CompoundList
                compounds={filteredCompounds}
                onFavorite={handleFavorite}
                onLocate={handleLocate}
                favorites={favorites}
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 ${isMapView ? "block" : "hidden md:block"}`}>
          <Map compounds={compounds} activeCompound={activeCompound} />
        </main>
      </div>

      {/* Favorites Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <Favorites
          favorites={favorites}
          compounds={compounds}
          onRemove={handleRemove}
          onClear={handleClear}
        />
      </Modal>
    </>
  );
};

export default Home;
