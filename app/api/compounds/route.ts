import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to the JSON file
const filePath = path.join(process.cwd(), "app/data", "compounds.json");

// Function to read the JSON file
const readData = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    throw new Error("Failed to read data");
  }
};

// Function to write to the JSON file
const writeData = (data: any) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing data:", error);
    throw new Error("Failed to write data");
  }
};

export async function GET() {
  try {
    const compounds = readData();
    return NextResponse.json(compounds);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedCompound = await request.json();
    const compounds = readData();

    const index = compounds.findIndex(
      (compound: any) => compound.id === updatedCompound.id
    );

    if (index !== -1) {
      // Merge existing compound data with updated data
      compounds[index] = { ...compounds[index], ...updatedCompound };
      writeData(compounds);
      return NextResponse.json({ message: "Compound updated successfully" });
    } else {
      return NextResponse.json(
        { error: "Compound not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  }
}
