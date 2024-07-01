import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CompoundCard from "@/app/components/CompoundCard";

describe("CompoundCard", () => {
  const compound = {
    id: 1,
    location: "New York, NY",
    price: 1500000,
    image: "image-url-1",
  };
  const onFavorite = jest.fn();
  const onLocate = jest.fn();

  it("renders the compound details correctly", () => {
    render(
      <CompoundCard {...compound} onFavorite={onFavorite} onLocate={onLocate} />
    );
    expect(screen.getByText("New York, NY")).toBeInTheDocument();
    expect(screen.getByText("$1,500,000")).toBeInTheDocument();
    expect(screen.getByAltText("New York, NY")).toBeInTheDocument();
  });

  it("calls onFavorite when the favorite button is clicked", () => {
    render(
      <CompoundCard {...compound} onFavorite={onFavorite} onLocate={onLocate} />
    );
    const favoriteButton = screen.getByText("Add to Favorites");
    fireEvent.click(favoriteButton);
    expect(onFavorite).toHaveBeenCalledWith(1);
  });

  it("calls onLocate when the card is clicked", () => {
    render(
      <CompoundCard {...compound} onFavorite={onFavorite} onLocate={onLocate} />
    );
    const card = screen.getByText("New York, NY")!.parentElement;
    fireEvent.click(card!);
    expect(onLocate).toHaveBeenCalled();
  });
});
