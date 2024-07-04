import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "compounds.json");

interface Compound {
  id: string;
  [key: string]: any;
}

const readData = async (): Promise<Compound[]> => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    throw new Error("Failed to read data");
  }
};

const writeData = async (data: Compound[]): Promise<void> => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing data:", error);
    throw new Error("Failed to write data");
  }
};

export async function GET() {
  try {
    const compounds = await readData();
    return NextResponse.json(compounds);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedCompound: Compound = await request.json();
    const compounds = await readData();

    const index = compounds.findIndex(
      (compound) => compound.id === updatedCompound.id
    );

    if (index !== -1) {
      compounds[index] = { ...compounds[index], ...updatedCompound };
      await writeData(compounds);
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
