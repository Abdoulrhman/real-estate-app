// __tests__/CompoundList.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CompoundList from "../components/CompoundList";

describe("CompoundList", () => {
  const compounds = [
    {
      id: 1,
      location: "New York, NY",
      price: 1500000,
      image: "image-url-1",
      position: [40.7128, -74.006],
    },
    {
      id: 2,
      location: "Los Angeles, CA",
      price: 2000000,
      image: "image-url-2",
      position: [34.0522, -118.2437],
    },
  ];
  const onFavorite = jest.fn();
  const onLocate = jest.fn();

  it("renders a list of compounds", () => {
    render(
      <CompoundList
        compounds={compounds}
        onFavorite={onFavorite}
        onLocate={onLocate}
      />
    );
    expect(screen.getByText("New York, NY")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles, CA")).toBeInTheDocument();
  });

  it("calls onFavorite when the favorite button is clicked", () => {
    render(
      <CompoundList
        compounds={compounds}
        onFavorite={onFavorite}
        onLocate={onLocate}
      />
    );
    const favoriteButtons = screen.getAllByText("Add to Favorites");
    fireEvent.click(favoriteButtons[0]);
    expect(onFavorite).toHaveBeenCalledWith(1);
  });

  it("calls onLocate when a card is clicked", () => {
    render(
      <CompoundList
        compounds={compounds}
        onFavorite={onFavorite}
        onLocate={onLocate}
      />
    );
    const cards = screen.getAllByText("New York, NY");
    fireEvent.click(cards[0]);
    expect(onLocate).toHaveBeenCalledWith(compounds[0]);
  });
});
