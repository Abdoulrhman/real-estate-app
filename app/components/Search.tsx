import React from "react";

interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ query, setQuery }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search compounds..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default Search;
