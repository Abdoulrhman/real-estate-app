Sure, here is the updated README file with the added section about the JSON data file used as a server to persist data:

---

# Real Estate Marketplace

This project is a task for PropertySorted Company, demonstrating a simple real estate marketplace front-end application using Next.js, React, Tailwind CSS, Framer Motion, React Leaflet, and TypeScript.

## Features

- View a list of real estate compounds.
- Search for compounds.
- Save and remove compounds from favorites.
- View the favorites in a modal.
- Locate compounds on a map with custom markers.
- Responsive design.
- Persist data using a JSON file.

## Libraries Used

- **Next.js**: A React framework for server-rendered applications.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Framer Motion**: A library for animations in React.
- **React Leaflet**: A library for interactive maps in React.
- **React Icons**: A library for popular icons in React.
- **React Modal**: A library for accessible modal dialogs in React.
- **Axios**: A promise-based HTTP client for making API requests.

## Functions

### `CompoundCard`

- **Props**:
  - `id`: Number - The unique identifier for the compound.
  - `location`: String - The location of the compound.
  - `price`: Number - The price of the compound.
  - `image`: String - The URL of the compound image.
  - `isFavorite`: Boolean - Indicates if the compound is a favorite.
  - `onFavorite`: Function - The function to handle adding/removing the compound from favorites.
  - `onLocate`: Function - The function to handle locating the compound on the map.
- **Description**: A card component that displays compound information and allows adding/removing from favorites and locating on the map.

### `CompoundList`

- **Props**:
  - `compounds`: Array - A list of compounds to display.
  - `favorites`: Array - A list of favorite compound IDs.
  - `onFavorite`: Function - The function to handle adding/removing compounds from favorites.
  - `onLocate`: Function - The function to handle locating compounds on the map.
- **Description**: A component that displays a list of `CompoundCard` components.

### `Favorites`

- **Props**:
  - `favorites`: Array - A list of favorite compound IDs.
  - `compounds`: Array - A list of all compounds.
  - `onRemove`: Function - The function to handle removing a compound from favorites.
  - `onClear`: Function - The function to clear all favorites.
- **Description**: A component that displays a list of favorite compounds.

### `Search`

- **Props**:
  - `query`: String - The current search query.
  - `setQuery`: Function - The function to update the search query.
- **Description**: A component that provides a search input to filter compounds by location.

### `Map`

- **Props**:
  - `compounds`: Array - A list of compounds to display on the map.
  - `activeCompound`: Object - The currently active compound to focus on the map.
- **Description**: A component that displays compounds on an interactive map using React Leaflet.

### `Modal`

- **Props**:
  - `isOpen`: Boolean - Indicates if the modal is open.
  - `onClose`: Function - The function to close the modal.
  - `children`: ReactNode - The content to display inside the modal.
- **Description**: A reusable modal component for displaying the favorites list.

### `Home`

- **Description**: The main component that integrates all the other components and manages the state of compounds, favorites, and the search query.

## Data Persistence

This project uses a JSON file (`compounds.json`) to persist data. The JSON file is read and updated through API routes in Next.js, allowing for persistent storage of compound data, including their favorite status.

### Example of `compounds.json`

```json
[
  {
    "id": 1,
    "location": "Sodic East",
    "price": 18500000,
    "image": "https://via.placeholder.com/300?text=Sodic+East",
    "position": [31.6677052114, 30.1598490856],
    "isFavorite": true
  },
  {
    "id": 2,
    "location": "Palm Hills October",
    "price": 12000000,
    "image": "https://via.placeholder.com/300?text=Palm+Hills+October",
    "position": [29.97648, 30.948776],
    "isFavorite": false
  }
  // ... more compounds
]
```

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd real-estate-marketplace
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Run the development server:

   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Use the search bar to filter compounds by location.
- Click on a compound card to locate it on the map.
- Click on the heart icon to add/remove a compound from favorites.
- Click the "Favorites" button in the header to view the favorites in a modal.
- Use the map to view the location of compounds with custom markers.

---
