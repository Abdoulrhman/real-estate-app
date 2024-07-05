import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CompoundCard from "@/app/components/CompoundCard";
import { Compound } from "@/app/types";

jest.mock("axios"); // Mock Axios

const mockCompound: Compound = {
  id: 1,
  location: "Sodic East",
  price: 18500000,
  image: "https://via.placeholder.com/300?text=Sodic+East",
  position: [31.6677052114, 30.1598490856],
  isFavorite: true,
};

const mockOnFavorite = jest.fn();
const mockOnLocate = jest.fn();
const mockSetCompounds = jest.fn();
const mockSetFavorites = jest.fn();

test("renders compound card with correct information", () => {
  render(
    <CompoundCard
      id={mockCompound.id}
      location={mockCompound.location}
      price={mockCompound.price}
      image={mockCompound.image}
      isFavorite={mockCompound.isFavorite}
      onFavorite={mockOnFavorite}
      onLocate={mockOnLocate}
      compounds={[mockCompound]}
      setCompounds={mockSetCompounds}
      setFavorites={mockSetFavorites}
    />
  );

  expect(screen.getByText(mockCompound.location)).toBeInTheDocument();
  expect(
    screen.getByText(`$${mockCompound.price.toLocaleString()}`)
  ).toBeInTheDocument();
  expect(
    screen.getByAltText(`Image of ${mockCompound.location}`)
  ).toBeInTheDocument();
});

test("handles favorite button click", async () => {
  render(
    <CompoundCard
      id={mockCompound.id}
      location={mockCompound.location}
      price={mockCompound.price}
      image={mockCompound.image}
      isFavorite={mockCompound.isFavorite}
      onFavorite={mockOnFavorite}
      onLocate={mockOnLocate}
      compounds={[mockCompound]}
      setCompounds={mockSetCompounds}
      setFavorites={mockSetFavorites}
    />
  );

  fireEvent.click(screen.getByTestId("favorite-button-1"));

  await waitFor(() =>
    expect(mockOnFavorite).toHaveBeenCalledWith(mockCompound.id)
  );
});

test("handles card click", () => {
  render(
    <CompoundCard
      id={mockCompound.id}
      location={mockCompound.location}
      price={mockCompound.price}
      image={mockCompound.image}
      isFavorite={mockCompound.isFavorite}
      onFavorite={mockOnFavorite}
      onLocate={mockOnLocate}
      compounds={[mockCompound]}
      setCompounds={mockSetCompounds}
      setFavorites={mockSetFavorites}
    />
  );

  fireEvent.click(screen.getByText(mockCompound.location));

  expect(mockOnLocate).toHaveBeenCalled();
});
