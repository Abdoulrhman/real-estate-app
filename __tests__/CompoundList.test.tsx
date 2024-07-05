import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CompoundList from "@/app/components/CompoundList";
import { Compound } from "@/app/types";

jest.mock("axios"); // Mock Axios

const mockCompounds: Compound[] = [
  {
    id: 1,
    location: "Sodic East",
    price: 18500000,
    image: "https://via.placeholder.com/300?text=Sodic+East",
    position: [31.6677052114, 30.1598490856],
    isFavorite: true,
  },
  {
    id: 2,
    location: "Palm Hills October",
    price: 12000000,
    image: "https://via.placeholder.com/300?text=Palm+Hills+October",
    position: [29.97648, 30.948776],
    isFavorite: true,
  },
  {
    id: 3,
    location: "Mivida",
    price: 15000000,
    image: "https://via.placeholder.com/300?text=Mivida",
    position: [30.002926, 31.419978],
    isFavorite: true,
  },
];

const mockOnFavorite = jest.fn();
const mockOnLocate = jest.fn();
const mockSetCompounds = jest.fn();
const mockSetFavorites = jest.fn();

test("renders list of compounds", () => {
  render(
    <CompoundList
      compounds={mockCompounds}
      onFavorite={mockOnFavorite}
      onLocate={mockOnLocate}
      favorites={[]}
      setCompounds={mockSetCompounds}
      setFavorites={mockSetFavorites}
    />
  );

  mockCompounds.forEach((compound) => {
    expect(screen.getByText(compound.location)).toBeInTheDocument();
  });
});

test("handles favorite action in list", async () => {
  render(
    <CompoundList
      compounds={mockCompounds}
      onFavorite={mockOnFavorite}
      onLocate={mockOnLocate}
      favorites={[]}
      setCompounds={mockSetCompounds}
      setFavorites={mockSetFavorites}
    />
  );

  // Find the specific favorite button for the first compound using data-testid
  const favoriteButton = screen.getByTestId("favorite-button-1");

  fireEvent.click(favoriteButton);

  await waitFor(() =>
    expect(mockOnFavorite).toHaveBeenCalledWith(mockCompounds[0].id)
  );
});
